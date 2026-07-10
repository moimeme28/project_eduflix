import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocial } from '../contexts/SocialContext';
import { useTheme } from '../contexts/ThemeContext';

const SocialHub = ({ user }) => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const {
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
    markNotificationRead,
    clearNotifications,
    getUnreadCount
  } = useSocial();

  const [activeTab, setActiveTab] = useState('friends');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const [showCreateWatchlist, setShowCreateWatchlist] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');

  const tabs = [
    { id: 'friends', label: 'Friends', icon: '👥', count: friends.length },
    { id: 'requests', label: 'Requests', icon: '📨', count: friendRequests.filter(r => r.status === 'pending').length },
    { id: 'watchlists', label: 'Shared Lists', icon: '📚', count: sharedWatchlists.length },
    { id: 'notifications', label: 'Notifications', icon: '🔔', count: getUnreadCount() }
  ];

  const handleAddFriend = () => {
    if (newFriendUsername.trim()) {
      sendFriendRequest('user_' + Date.now(), newFriendUsername.trim());
      setNewFriendUsername('');
      setShowAddFriend(false);
    }
  };

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      createSharedWatchlist(newWatchlistName.trim(), [], true);
      setNewWatchlistName('');
      setShowCreateWatchlist(false);
    }
  };

  const mockUsers = [
    { id: 'user_1', username: 'MovieBuff92', name: 'Alex Chen', avatar: '🎬', status: 'online', mutualFriends: 12 },
    { id: 'user_2', username: 'BookWorm', name: 'Sarah Johnson', avatar: '📚', status: 'online', mutualFriends: 8 },
    { id: 'user_3', username: 'Cinephile', name: 'Mike Davis', avatar: '🎭', status: 'offline', mutualFriends: 15 },
    { id: 'user_4', username: 'BingeWatcher', name: 'Emma Wilson', avatar: '🍿', status: 'online', mutualFriends: 6 }
  ];

  const mockSharedLists = [
    {
      id: '1',
      name: '90s Action Classics',
      createdBy: 'Alex Chen',
      items: 23,
      likes: 156,
      isPublic: true,
      tags: ['Action', '90s', 'Classic'],
      description: 'The best action movies from the 1990s'
    },
    {
      id: '2',
      name: 'Cozy Weekend Reads',
      createdBy: 'Sarah Johnson',
      items: 18,
      likes: 89,
      isPublic: true,
      tags: ['Books', 'Cozy', 'Weekend'],
      description: 'Perfect books for a relaxing weekend'
    },
    {
      id: '3',
      name: 'Thriller Marathon',
      createdBy: 'Mike Davis',
      items: 31,
      likes: 234,
      isPublic: true,
      tags: ['Thriller', 'Marathon', 'Suspense'],
      description: 'A curated list for thriller movie marathons'
    }
  ];

  return (
    <div style={{
      background: currentTheme.background,
      color: currentTheme.text,
      padding: '20px',
      borderRadius: '16px',
      border: `1px solid ${currentTheme.border}`,
      minHeight: '600px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              background: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              color: currentTheme.text,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = currentTheme.background;
              e.currentTarget.style.borderColor = currentTheme.border;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = currentTheme.surface;
              e.currentTarget.style.borderColor = currentTheme.border;
            }}
          >
            ← Back
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: currentTheme.text }}>
              🌟 Social Hub
            </h2>
            <p style={{ margin: '4px 0 0 0', color: currentTheme.textSecondary, fontSize: 14 }}>
              Connect with friends and share your favorite content
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        borderBottom: `1px solid ${currentTheme.border}`,
        paddingBottom: '12px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? currentTheme.surface : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? `2px solid #4a90d9` : '2px solid transparent',
              borderRadius: '8px 8px 0 0',
              color: activeTab === tab.id ? currentTheme.text : currentTheme.textSecondary,
              padding: '12px 16px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span style={{
                background: '#e74c3c',
                color: '#ffffff',
                borderRadius: '10px',
                padding: '2px 6px',
                fontSize: 12,
                fontWeight: 700
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: 0, fontSize: 18, color: currentTheme.text }}>
              Your Friends ({friends.length})
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowAddFriend(true)}
                style={{
                  background: '#4a90d9',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                ➕ Add Friend
              </button>
              <button
                style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  color: currentTheme.text,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                🔍 Find Friends
              </button>
            </div>
          </div>

          {/* Add Friend Modal */}
          {showAddFriend && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                background: currentTheme.background,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '16px',
                padding: '24px',
                width: '400px',
                maxWidth: '90%'
              }}>
                <h4 style={{ marginTop: 0, marginBottom: 16, color: currentTheme.text }}>
                  Add New Friend
                </h4>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={newFriendUsername}
                  onChange={(e) => setNewFriendUsername(e.target.value)}
                  style={{
                    width: '100%',
                    background: currentTheme.surface,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    color: currentTheme.text,
                    padding: '12px',
                    fontSize: 14,
                    marginBottom: 16
                  }}
                />
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setShowAddFriend(false)}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.textSecondary,
                      padding: '8px 16px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFriend}
                    style={{
                      background: '#4a90d9',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#ffffff',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Friends List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {/* Actual friends */}
            {friends.map(friend => (
              <div key={friend.id} style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <div style={{
                  fontSize: 32,
                  background: '#4a90d9',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {friend.avatar || '👤'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: currentTheme.text,
                    marginBottom: 4
                  }}>
                    {friend.name}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: currentTheme.textSecondary,
                    marginBottom: 8
                  }}>
                    @{friend.username} · Friends since {new Date(friend.addedAt).toLocaleDateString()}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      background: currentTheme.background,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '6px',
                      color: currentTheme.text,
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: 12
                    }}>
                      📬 Message
                    </button>
                    <button style={{
                      background: currentTheme.background,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '6px',
                      color: currentTheme.text,
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: 12
                    }}>
                      📚 Watchlist
                    </button>
                    <button
                      onClick={() => removeFriend(friend.id)}
                      style={{
                        background: '#e74c3c',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#ffffff',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Suggested friends */}
            {mockUsers.slice(0, 3).map(suggestedUser => (
              <div key={suggestedUser.id} style={{
                background: `${currentTheme.surface}88`,
                border: `1px solid ${currentTheme.border}66`,
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: 0.8
              }}>
                <div style={{
                  fontSize: 32,
                  background: '#888',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {suggestedUser.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: currentTheme.text,
                    marginBottom: 4
                  }}>
                    {suggestedUser.name}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: currentTheme.textSecondary,
                    marginBottom: 8
                  }}>
                    @{suggestedUser.username} · {suggestedUser.mutualFriends} mutual friends
                  </div>
                  <button style={{
                    background: '#4a90d9',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#ffffff',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    ➕ Add Friend
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: 0, fontSize: 18, color: currentTheme.text }}>
              Notifications
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                style={{
                  background: 'transparent',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  color: currentTheme.textSecondary,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: currentTheme.textSecondary
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔔</div>
              <div>No notifications yet</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {notifications.map(notification => (
                <div key={notification.id} style={{
                  background: notification.read ? currentTheme.surface : `${currentTheme.surface}dd`,
                  border: `1px solid ${notification.read ? currentTheme.border : currentTheme.accent}`,
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  cursor: 'pointer'
                }}
                onClick={() => markNotificationRead(notification.id)}
                >
                  <div style={{
                    fontSize: 20,
                    opacity: notification.read ? 0.5 : 1
                  }}>
                    {notification.type === 'friend_request' && '👥'}
                    {notification.type === 'friend_accepted' && '✅'}
                    {notification.type === 'social_share' && '📤'}
                    {notification.type === 'watchlist_created' && '📚'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: notification.read ? 400 : 600,
                      color: currentTheme.text,
                      marginBottom: 4
                    }}>
                      {notification.message}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: currentTheme.textSecondary
                    }}>
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Shared Watchlists Tab */}
      {activeTab === 'watchlists' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: 0, fontSize: 18, color: currentTheme.text }}>
              Community Watchlists
            </h3>
            <button
              onClick={() => setShowCreateWatchlist(true)}
              style={{
                background: '#4a90d9',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              ➕ Create List
            </button>
          </div>

          {/* Create Watchlist Modal */}
          {showCreateWatchlist && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                background: currentTheme.background,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '16px',
                padding: '24px',
                width: '400px',
                maxWidth: '90%'
              }}>
                <h4 style={{ marginTop: 0, marginBottom: 16, color: currentTheme.text }}>
                  Create Shared Watchlist
                </h4>
                <input
                  type="text"
                  placeholder="Enter watchlist name"
                  value={newWatchlistName}
                  onChange={(e) => setNewWatchlistName(e.target.value)}
                  style={{
                    width: '100%',
                    background: currentTheme.surface,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    color: currentTheme.text,
                    padding: '12px',
                    fontSize: 14,
                    marginBottom: 16
                  }}
                />
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setShowCreateWatchlist(false)}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.textSecondary,
                      padding: '8px 16px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateWatchlist}
                    style={{
                      background: '#4a90d9',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#ffffff',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shared Lists Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {[...sharedWatchlists, ...mockSharedLists].map(list => (
              <div key={list.id} style={{
                background: currentTheme.surface,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: currentTheme.text,
                  marginBottom: 8
                }}>
                  {list.name}
                </div>
                <div style={{
                  fontSize: 13,
                  color: currentTheme.textSecondary,
                  marginBottom: 12
                }}>
                  by {list.createdBy} · {list.items} items
                </div>
                {list.description && (
                  <div style={{
                    fontSize: 13,
                    color: currentTheme.text,
                    marginBottom: 12,
                    lineHeight: 1.4
                  }}>
                    {list.description}
                  </div>
                )}
                {list.tags && (
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                    {list.tags.map(tag => (
                      <span key={tag} style={{
                        background: `${currentTheme.accent}22`,
                        border: `1px solid ${currentTheme.accent}44`,
                        borderRadius: '12px',
                        padding: '4px 8px',
                        fontSize: 11,
                        color: currentTheme.accent
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button
                      onClick={() => likeWatchlist(list.id)}
                      style={{
                        background: 'transparent',
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '6px',
                        color: currentTheme.text,
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      ❤️ {list.likes}
                    </button>
                    <span style={{
                      fontSize: 12,
                      color: currentTheme.textSecondary
                    }}>
                      👁 {list.views} views
                    </span>
                  </div>
                  <div style={{
                    fontSize: 12,
                    padding: '4px 8px',
                    background: list.isPublic ? '#2ecc71' : '#f39c12',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontWeight: 600
                  }}>
                    {list.isPublic ? '🌍 Public' : '🔒 Private'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialHub;
