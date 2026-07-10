// Type definitions for MoodCurator application

export const MoodTypes = {
  MELANCHOLIC: 'Melancholic',
  PLAYFUL: 'Playful',
  THRILLED: 'Thrilled',
  CURIOUS: 'Curious',
  ROMANTIC: 'Romantic',
  INSPIRED: 'Inspired',
  COZY: 'Cozy',
  DARK: 'Dark'
};

export const ItemType = {
  MOVIE: 'movie',
  BOOK: 'book'
};

export const NotificationType = {
  FRIEND_REQUEST: 'friend_request',
  FRIEND_ACCEPTED: 'friend_accepted',
  FRIEND_REJECTED: 'friend_rejected',
  FRIEND_REMOVED: 'friend_removed',
  WATCHLIST_CREATED: 'watchlist_created',
  SOCIAL_SHARE: 'social_share',
  ERROR: 'error',
  SUCCESS: 'success'
};

// Validation utilities
export const validateMood = (mood) => Object.values(MoodTypes).includes(mood);

export const validateItemType = (type) => Object.values(ItemType).includes(type);

export const validateRating = (rating) => typeof rating === 'number' && rating >= 0 && rating <= 10;

export const validateMatch = (match) => typeof match === 'number' && match >= 0 && match <= 100;
