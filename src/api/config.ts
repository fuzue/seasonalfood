// API configuration settings
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.example.com/seasonal-foods',
  TIMEOUT: 10000,
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// Optional API key management
export const getApiKey = () => import.meta.env.VITE_API_KEY || '';