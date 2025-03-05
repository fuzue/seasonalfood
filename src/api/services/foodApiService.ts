import { API_CONFIG, getApiKey } from '../config';
import { ApiResponse, ApiFoodData, CachedData, FoodApiParams } from '../types';
import { FoodList, FoodObject, FoodDescription } from '../../types/food';

// Cache for API responses
const apiCache = new Map<string, CachedData<FoodList>>();

/**
 * Converts API food data to application food format
 */
export const adaptApiData = (apiData: ApiFoodData[]): FoodList => {
  return apiData.map((item): FoodObject => {
    // Convert description from API format to app format
    const description: FoodDescription[] = Object.entries(item.names).map(([lang, name]) => ({
      lang,
      name,
      slug: name
        .toLowerCase()
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
        .replace(/^\s+|\s+$/gm, "")
        .replace(/\s+/g, "-"),
    }));

    // Convert season months (1-12) to boolean array (0-11)
    const season = Array(12).fill(false);
    item.season_months.forEach(month => {
      season[month - 1] = true;
    });

    return {
      category: item.category,
      description,
      image: item.image_url,
      season,
    };
  });
};

/**
 * Create cache key from parameters
 */
const getCacheKey = (params: FoodApiParams = {}): string => {
  return Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

/**
 * Check if cached data is still valid
 */
const isCacheValid = (cachedData: CachedData<FoodList>): boolean => {
  return Date.now() - cachedData.timestamp < API_CONFIG.CACHE_DURATION;
};

/**
 * Fetch food data from API
 */
export const fetchFoodData = async (params: FoodApiParams = {}): Promise<FoodList> => {
  try {
    const cacheKey = getCacheKey(params);
    
    // Check cache first
    const cachedData = apiCache.get(cacheKey);
    if (cachedData && isCacheValid(cachedData)) {
      console.log('Using cached food data');
      return cachedData.data;
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    // Add API key if available
    const apiKey = getApiKey();
    if (apiKey) {
      queryParams.append('apiKey', apiKey);
    }

    // Make API request
    const url = `${API_CONFIG.BASE_URL}?${queryParams.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const apiResponse: ApiResponse<ApiFoodData[]> = await response.json();
    
    if (apiResponse.error) {
      throw new Error(apiResponse.error);
    }

    // Convert API data to application format
    const foodList = adaptApiData(apiResponse.data);
    
    // Cache the result
    apiCache.set(cacheKey, {
      data: foodList,
      timestamp: Date.now(),
    });

    return foodList;
  } catch (error) {
    console.error('Failed to fetch food data:', error);
    throw error;
  }
};

/**
 * Clear the API cache
 */
export const clearFoodCache = (): void => {
  apiCache.clear();
};