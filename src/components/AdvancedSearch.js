import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AdvancedSearch = ({ onSearch, onFiltersChange, activeTab }) => {
  const { currentTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    genre: 'All',
    yearMin: '',
    yearMax: '',
    ratingMin: 0,
    ratingMax: 10,
    durationMin: '',
    durationMax: '',
    streaming: 'All',
    sortBy: 'match',
    sortOrder: 'desc'
  });

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary', 'Animation'];
  const streamingPlatforms = ['All', 'Netflix', 'HBO Max', 'Amazon Prime', 'Hulu', 'Disney+', 'Apple TV+', 'Paramount+'];
  const sortOptions = [
    { value: 'match', label: 'Match Score' },
    { value: 'rating', label: 'Rating' },
    { value: 'year', label: 'Year' },
    { value: 'title', label: 'Title' },
    { value: 'duration', label: 'Duration' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      genre: 'All',
      yearMin: '',
      yearMax: '',
      ratingMin: 0,
      ratingMax: 10,
      durationMin: '',
      durationMax: '',
      streaming: 'All',
      sortBy: 'match',
      sortOrder: 'desc'
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Main Search Bar */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <input
          type="text"
          placeholder={`Search ${activeTab}... (title, director, cast, tags)`}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            flex: 1,
            background: currentTheme.surface,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '12px',
            color: currentTheme.text,
            padding: '14px 18px',
            fontSize: '16px',
            outline: 'none'
          }}
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: currentTheme.surface,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '12px',
            color: currentTheme.text,
            padding: '14px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          {isExpanded ? '▼ Filters' : '▲ Filters'}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {isExpanded && (
        <div style={{
          background: currentTheme.surface,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {/* Genre Filter */}
            <div>
              <label style={{ color: currentTheme.textSecondary, fontSize: '12px', marginBottom: '5px', display: 'block' }}>
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                style={{
                  width: '100%',
                  background: currentTheme.background,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  color: currentTheme.text,
                  padding: '8px 12px',
                  fontSize: '14px'
                }}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Year Range */}
            <div>
              <label style={{ color: currentTheme.textSecondary, fontSize: '12px', marginBottom: '5px', display: 'block' }}>
                Year Range
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  placeholder="From"
                  value={filters.yearMin}
                  onChange={(e) => handleFilterChange('yearMin', e.target.value)}
                  style={{
                    flex: 1,
                    background: currentTheme.background,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    color: currentTheme.text,
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="number"
                  placeholder="To"
                  value={filters.yearMax}
                  onChange={(e) => handleFilterChange('yearMax', e.target.value)}
                  style={{
                    flex: 1,
                    background: currentTheme.background,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    color: currentTheme.text,
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Rating Range */}
            <div>
              <label style={{ color: currentTheme.textSecondary, fontSize: '12px', marginBottom: '5px', display: 'block' }}>
                Rating Range
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.ratingMin}
                  onChange={(e) => handleFilterChange('ratingMin', parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={{ color: currentTheme.text, fontSize: '12px', minWidth: '30px' }}>
                  {filters.ratingMin}
                </span>
                <span style={{ color: currentTheme.textSecondary }}>to</span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.ratingMax}
                  onChange={(e) => handleFilterChange('ratingMax', parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={{ color: currentTheme.text, fontSize: '12px', minWidth: '30px' }}>
                  {filters.ratingMax}
                </span>
              </div>
            </div>

            {/* Duration (Movies only) */}
            {activeTab === 'movies' && (
              <div>
                <label style={{ color: currentTheme.textSecondary, fontSize: '12px', marginBottom: '5px', display: 'block' }}>
                  Duration (min)
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.durationMin}
                    onChange={(e) => handleFilterChange('durationMin', e.target.value)}
                    style={{
                      flex: 1,
                      background: currentTheme.background,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.text,
                      padding: '8px 12px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.durationMax}
                    onChange={(e) => handleFilterChange('durationMax', e.target.value)}
                    style={{
                      flex: 1,
                      background: currentTheme.background,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.text,
                      padding: '8px 12px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Streaming Platform (Movies only) */}
            {activeTab === 'movies' && (
              <div>
                <label style={{ color: currentTheme.textSecondary, fontSize: '12px', marginBottom: '5px', display: 'block' }}>
                  Streaming Platform
                </label>
                <select
                  value={filters.streaming}
                  onChange={(e) => handleFilterChange('streaming', e.target.value)}
                  style={{
                    width: '100%',
                    background: currentTheme.background,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    color: currentTheme.text,
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                >
                  {streamingPlatforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort Options */}
            <div>
              <label style={{ color: currentTheme.textSecondary, fontSize: '12px', marginBottom: '5px', display: 'block' }}>
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                style={{
                  width: '100%',
                  background: currentTheme.background,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  color: currentTheme.text,
                  padding: '8px 12px',
                  fontSize: '14px'
                }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label style={{ color: currentTheme.textSecondary, fontSize: '12px', marginBottom: '5px', display: 'block' }}>
                Order
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleFilterChange('sortOrder', 'asc')}
                  style={{
                    flex: 1,
                    background: filters.sortOrder === 'asc' ? currentTheme.accent : currentTheme.surface,
                    border: `1px solid ${filters.sortOrder === 'asc' ? currentTheme.accent : currentTheme.border}`,
                    borderRadius: '8px',
                    color: filters.sortOrder === 'asc' ? '#ffffff' : currentTheme.text,
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ↑ Asc
                </button>
                <button
                  onClick={() => handleFilterChange('sortOrder', 'desc')}
                  style={{
                    flex: 1,
                    background: filters.sortOrder === 'desc' ? currentTheme.accent : currentTheme.surface,
                    border: `1px solid ${filters.sortOrder === 'desc' ? currentTheme.accent : currentTheme.border}`,
                    borderRadius: '8px',
                    color: filters.sortOrder === 'desc' ? '#ffffff' : currentTheme.text,
                    padding: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ↓ Desc
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={clearFilters}
              style={{
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.textSecondary,
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear All
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              style={{
                background: currentTheme.accent,
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
