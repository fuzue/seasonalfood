// Export all API services and types for easy imports
import { fetchFoodData, clearFoodCache, adaptApiData } from './services/foodApiService';
import { fetchSeasonalFoodGuideData, adaptSeasonalFoodGuideData } from './services/seasonalFoodGuideService';
import { API_CONFIG, getApiKey } from './config';
import { FoodApiParams } from './types';
import { FoodList } from '../types/food';

// Default API service to use (can be configured)
const API_SERVICE = import.meta.env.VITE_API_SERVICE || 'default';

/**
 * Fetches food data from the configured API service
 */
export const fetchSeasonalFoodData = async (params: FoodApiParams = {}): Promise<FoodList> => {
  try {
    // Choose which API service to use based on configuration
    switch (API_SERVICE) {
      case 'seasonalfoodguide':
        return await fetchSeasonalFoodGuideData(params);
      
      // Add more API services as they're implemented
      // case 'openfoodfacts':
      //   return await fetchOpenFoodFactsData(params);
      
      // Default to the generic API service
      default:
        return await fetchFoodData(params);
    }
  } catch (error) {
    console.error('Error fetching seasonal food data:', error);
    throw error;
  }
};

// Export everything for direct access if needed
export {
  fetchFoodData,
  clearFoodCache,
  adaptApiData,
  fetchSeasonalFoodGuideData,
  adaptSeasonalFoodGuideData,
  API_CONFIG,
  getApiKey
};