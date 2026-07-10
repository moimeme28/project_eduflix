import { createContext, useContext, useState, useEffect } from 'react';

const SocialContext = createContext();

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

export const SocialProvider = ({ children }) => {
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('friends');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [friendRequests, setFriendRequests] = useState(() => {
    const saved = localStorage.getItem('friendRequests');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [sharedWatchlists, setSharedWatchlists] = useState(() => {
    const saved = localStorage.getItem('sharedWatchlists');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  useEffect(() => {
    localStorage.setItem('sharedWatchlists', JSON.stringify(sharedWatchlists));
  }, [sharedWatchlists]);

  const sendFriendRequest = (userId, username) => {
    const request = {
      id: Date.now().toString(),
      from: JSON.parse(localStorage.getItem('user'))?.name || 'Anonymous',
      fromId: JSON.parse(localStorage.getItem('user'))?.id || 'user_' + Date.now(),
      to: userId,
      toUsername: username,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    setFriendRequests(prev => [...prev, request]);
    addNotification('friend_request', `Friend request sent to ${username}`);
  };

  const acceptFriendRequest = (requestId) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      const newFriend = {
        id: request.fromId,
        username: request.fromUsername,
        name: request.from,
        status: 'active',
        addedAt: new Date().toISOString()
      };
      
      setFriends(prev => [...prev, newFriend]);
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      addNotification('friend_accepted', `You are now friends with ${request.fromUsername}`);
    }
  };

  const rejectFriendRequest = (requestId) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    addNotification('friend_rejected', 'Friend request rejected');
  };

  const removeFriend = (friendId) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
    addNotification('friend_removed', 'Friend removed from your list');
  };

  const createSharedWatchlist = (name, items, isPublic = false) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const watchlist = {
      id: Date.now().toString(),
      name,
      items,
      createdBy: user?.name || 'Anonymous',
      createdById: user?.id || 'user_' + Date.now(),
      isPublic,
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0
    };
    
    setSharedWatchlists(prev => [...prev, watchlist]);
    addNotification('watchlist_created', `Watchlist "${name}" created successfully`);
  };

  const likeWatchlist = (watchlistId) => {
    setSharedWatchlists(prev => 
      prev.map(wl => 
        wl.id === watchlistId 
          ? { ...wl, likes: wl.likes + 1 }
          : wl
      )
    );
  };

  const shareToSocial = (item, platform) => {
    const shareText = `Check out "${item.title}" on MoodCurator! ${item.type === 'movie' ? '🎬' : '📚'}`;
    const shareUrl = `${window.location.origin}/item/${item.id}`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'reddit') {
      window.open(`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(item.title)}`, '_blank');
    }
    
    addNotification('social_share', `Shared ${item.title} to ${platform}`);
  };

  const addNotification = (type, message) => {
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [notification, ...prev].slice(0, 50));
  };

  const markNotificationRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId 
          ? { ...n, read: true }
          : n
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return (
    <SocialContext.Provider value={{
      friends,
      friendRequests,
      sharedWatchlists,
      notifications,
      sendFriendRequest,
      acceptFriendRequest,
      rejectFriendRequest,
      removeFriend,
      createSharedWatchlist,
      likeWatchlist,
      shareToSocial,
      addNotification,
      markNotificationRead,
      clearNotifications,
      getUnreadCount
    }}>
      {children}
    </SocialContext.Provider>
  );
};
