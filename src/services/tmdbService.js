import axios from 'axios';
import { parseError, retryAsync, sleep } from '../utils/helpers';

// TMDB API Configuration
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// Validate environment variables
if (!API_KEY) {
  console.warn('TMDB API key not found in environment variables. Some features may not work.');
}

// Create axios instance with default configuration
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  },
  timeout: 10000 // 10 second timeout
});

// Add error handling interceptor
tmdbApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 429) {
      console.warn('TMDB API rate limit exceeded, retrying with backoff...');
      await sleep(1000); // Wait before retry
      return tmdbApi(originalRequest);
    } else if (error.response?.status === 401) {
      console.error('TMDB API key invalid or expired');
      return Promise.reject(new Error('Invalid API credentials'));
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timeout - please try again'));
    }
    
    return Promise.reject(error);
  }
);

// TMDB API Service Functions
export const tmdbService = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await retryAsync(async () => {
        return await tmdbApi.get('/movie/popular', {
          params: { page }
        });
      }, 2, 500);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', parseError(error));
      return [];
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await retryAsync(async () => {
        return await tmdbApi.get('/search/movie', {
          params: { query, page }
        });
      }, 2, 500);
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', parseError(error));
      return [];
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await retryAsync(async () => {
        return await tmdbApi.get(`/movie/${movieId}`, {
          params: {
            append_to_response: 'videos,credits,similar,reviews'
          }
        });
      }, 2, 500);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', parseError(error));
      return null;
    }
  },

  // Get movie trailer
  getMovieTrailer: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}/videos`);
      const videos = response.data.results;
      const trailer = videos.find(video => 
        video.type === 'Trailer' && video.site === 'YouTube'
      );
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (error) {
      console.error('Error fetching movie trailer:', parseError(error));
      return null;
    }
  },

  // Discover movies by genre/mood
  discoverMovies: async (genreId, page = 1, year = null) => {
    try {
      const params = {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page
      };
      
      if (year) {
        params.primary_release_year = year;
      }

      const response = await retryAsync(async () => {
        return await tmdbApi.get('/discover/movie', { params });
      }, 2, 500);
      return response.data.results;
    } catch (error) {
      console.error('Error discovering movies:', parseError(error));
      return [];
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await retryAsync(async () => {
        return await tmdbApi.get('/movie/top_rated', {
          params: { page }
        });
      }, 2, 500);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', parseError(error));
      return [];
    }
  },

  // Get movies by mood (using genre mappings)
  getMoviesByMood: async (mood, page = 1) => {
    // Mood to genre ID mappings
    const moodGenres = {
      'Thrilled': [28, 12, 53], // Action, Adventure, Thriller
      'Melancholic': [18, 10749], // Drama, Mystery
      'Curious': [878, 14, 36], // Science Fiction, Fantasy, History
      'Playful': [35, 16, 10751], // Comedy, Animation, Family
      'Romantic': [10749, 10749], // Romance, Drama
      'Inspired': [99, 18], // Documentary, Drama
      'Cozy': [10751, 35], // Family, Comedy
      'Dark': [27, 53, 9648] // Horror, Thriller, TV Movie
    };

    const genres = moodGenres[mood] || [18]; // Default to Drama
    const genreIds = genres.join(',');

    try {
      const response = await retryAsync(async () => {
        return await tmdbApi.get('/discover/movie', {
          params: {
            with_genres: genreIds,
            sort_by: 'popularity.desc',
            page
          }
        });
      }, 2, 500);
      return response.data.results;
    } catch (error) {
      console.error('Error getting movies by mood:', parseError(error));
      return [];
    }
  },

  // Get movies with credits
  getMoviesWithCredits: async (movies) => {
    try {
      const moviesWithCredits = [];
      
      // Process movies one by one with delays to avoid rate limiting
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        try {
          const details = await tmdbApi.get(`/movie/${movie.id}`, {
            params: {
              append_to_response: 'credits'
            }
          });
          moviesWithCredits.push({
            ...movie,
            ...details.data
          });
          
          // Add delay between requests to avoid rate limiting
          if (i < movies.length - 1) {
            await sleep(200); // 200ms delay
          }
        } catch (error) {
          console.warn(`Could not fetch credits for movie ${movie.id}:`, parseError(error));
          // Add movie without credits
          moviesWithCredits.push(movie);
        }
      }
      
      return moviesWithCredits;
    } catch (error) {
      console.error('Error fetching movies with credits:', parseError(error));
      return movies;
    }
  },

  // Get similar movies
  getSimilarMovies: async (movieId, page = 1) => {
    try {
      const response = await retryAsync(async () => {
        return await tmdbApi.get(`/movie/${movieId}/similar`, {
          params: { page }
        });
      }, 2, 500);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching similar movies:', parseError(error));
      return [];
    }
  },

  // Get genre list
  getGenres: async () => {
    try {
      const response = await tmdbApi.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', parseError(error));
      return [];
    }
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow = 'week', page = 1) => {
    try {
      const response = await retryAsync(async () => {
        return await tmdbApi.get(`/trending/movie/${timeWindow}`, {
          params: { page }
        });
      }, 2, 500);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', parseError(error));
      return [];
    }
  }
};

export default tmdbService;
