// Environment variable validation utilities

const requiredEnvVars = {
  REACT_APP_TMDB_API_KEY: {
    description: 'TMDB API key for movie data',
    required: false, // App can work without it with fallback data
    pattern: /^[a-f0-9]{32}$/i
  },
  REACT_APP_TMDB_BASE_URL: {
    description: 'TMDB API base URL',
    required: false,
    defaultValue: 'https://api.themoviedb.org/3'
  },
  REACT_APP_GOOGLE_AI_API_KEY: {
    description: 'Google AI Studio API key for AI chat assistant (Gemini)',
    required: false, // App can work without AI chat
    pattern: /^AIza[a-zA-Z0-9_-]{35}|AQ\.[a-zA-Z0-9_-]+$/ // Support both formats
  }
};

export const validateEnvVars = () => {
  const errors = [];
  const warnings = [];
  const config = {};

  Object.entries(requiredEnvVars).forEach(([key, config]) => {
    const value = process.env[key];

    if (config.required && !value) {
      errors.push(`Missing required environment variable: ${key} (${config.description})`);
    } else if (!value) {
      warnings.push(`Optional environment variable not set: ${key} (${config.description})`);
      config[key] = config.defaultValue || null;
    } else {
      if (config.pattern && !config.pattern.test(value)) {
        errors.push(`Invalid format for ${key}: ${value}`);
      }
      config[key] = value;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config
  };
};

export const printEnvValidation = () => {
  const validation = validateEnvVars();

  if (validation.errors.length > 0) {
    console.error('❌ Environment Variable Validation Failed:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
  }

  if (validation.warnings.length > 0) {
    console.warn('⚠️  Environment Variable Warnings:');
    validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }

  if (validation.isValid && validation.warnings.length === 0) {
    console.log('✅ All environment variables are valid');
  }

  return validation;
};

// Run validation on import
if (typeof window !== 'undefined') {
  printEnvValidation();
}

export default validateEnvVars;
