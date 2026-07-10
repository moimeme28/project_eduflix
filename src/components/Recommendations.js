import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Film, Play, Bookmark, Check } from 'lucide-react';
import { LEARNING_LEVELS, LEARNING_FORMATS } from '../data/subjects';

const Recommendations = ({ subject, topic, level, format, movies, loading, onLevelChange, onFormatChange }) => {
  const [saved, setSaved] = React.useState([]);
  const [watched, setWatched] = React.useState([]);

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleWatched = (id) => {
    setWatched(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/subjects" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Subjects
          </Link>
          <h1 className="text-3xl font-bold font-display mb-2">
            Recommendations for {topic?.name || subject?.name}
          </h1>
          <p className="text-gray-400">
            Personalized educational content based on your preferences
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Learning Level */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">Learning Level</label>
              <div className="flex flex-wrap gap-2">
                {LEARNING_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => onLevelChange(lvl.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      level === lvl.id
                        ? 'bg-gradient-primary text-white'
                        : 'glass-button text-gray-300 hover:text-white'
                    }`}
                  >
                    {lvl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Format */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">Content Format</label>
              <div className="flex flex-wrap gap-2">
                {LEARNING_FORMATS.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => onFormatChange(fmt.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      format === fmt.id
                        ? 'bg-gradient-primary text-white'
                        : 'glass-button text-gray-300 hover:text-white'
                    }`}
                  >
                    <span>{fmt.icon}</span>
                    {fmt.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <p className="mt-4 text-gray-400">Finding the best educational content...</p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="glass-card overflow-hidden hover:scale-105 transition-transform group"
              >
                {/* Poster */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>

                  {/* Educational Value Badge */}
                  {movie.educationalMetadata && (
                    <div className="absolute top-3 left-3 bg-primary-500/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <span className="text-xs font-medium">
                        Edu: {movie.educationalMetadata.educationalValue}/10
                      </span>
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                  
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    {movie.release_date && (
                      <span>{movie.release_date.split('-')[0]}</span>
                    )}
                    {movie.runtime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {movie.runtime}m
                      </span>
                    )}
                  </div>

                  {/* Educational Tags */}
                  {movie.educationalMetadata && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {movie.educationalMetadata.topics?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs bg-primary-500/20 text-primary-400 border border-primary-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Overview */}
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                    {movie.overview || 'No description available.'}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSave(movie.id)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        saved.includes(movie.id)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'glass-button text-gray-300'
                      }`}
                    >
                      {saved.includes(movie.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => toggleWatched(movie.id)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        watched.includes(movie.id)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'glass-button text-gray-300'
                      }`}
                    >
                      {watched.includes(movie.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Watched
                        </>
                      ) : (
                        <>
                          <Film className="w-4 h-4" />
                          Mark
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && movies.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Film className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-bold mb-2">No recommendations found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or explore different subjects
            </p>
            <Link
              to="/subjects"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-primary font-medium"
            >
              Browse All Subjects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
