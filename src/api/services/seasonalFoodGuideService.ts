import { API_CONFIG, getApiKey } from '../config';
import { ApiResponse, ApiFoodData, CachedData, FoodApiParams } from '../types';
import { FoodList, FoodObject, FoodDescription } from '../../types/food';

// Interface for Seasonal Food Guide API response
interface SeasonalFoodGuideItem {
  id: number;
  name: string;
  category: string;
  image_path: string;
  seasons: {
    [region: string]: {
      months: number[];  // 1-12 for January-December
    }
  };
  translations?: {
    [lang: string]: {
      name: string;
    }
  };
}

// Cache for API responses
const apiCache = new Map<string, CachedData<FoodList>>();

/**
 * Convert Seasonal Food Guide data to our app format
 */
export const adaptSeasonalFoodGuideData = (items: SeasonalFoodGuideItem[], params: FoodApiParams): FoodList => {
  const region = params.region || 'ITALIA';
  
  return items
    .filter(item => item.seasons && item.seasons[region]) // Only include items with data for the requested region
    .map((item): FoodObject => {
      // Process translations/names
      const descriptions: FoodDescription[] = [];
      
      // Add default English name
      descriptions.push({
        lang: 'en',
        name: item.name,
        slug: item.name
          .toLowerCase()
          .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
          .replace(/^\s+|\s+$/gm, "")
          .replace(/\s+/g, "-"),
      });
      
      // Add translations if available
      if (item.translations) {
        Object.entries(item.translations).forEach(([lang, translation]) => {
          if (lang !== 'en') {
            descriptions.push({
              lang,
              name: translation.name,
              slug: translation.name
                .toLowerCase()
                .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
                .replace(/^\s+|\s+$/gm, "")
                .replace(/\s+/g, "-"),
            });
          }
        });
      }
      
      // Convert season months to boolean array
      const seasonMonths = item.seasons[region].months || [];
      const season = Array(12).fill(false);
      seasonMonths.forEach(month => {
        season[month - 1] = true; // Convert 1-indexed to 0-indexed
      });
      
      return {
        category: item.category === 'Fruit' ? 'Fruits' : 'Veggies', // Normalize category
        description: descriptions,
        image: item.image_path || `images/${item.name.toLowerCase()}.png`, // Use provided image or fall back to local
        season,
      };
    });
};

/**
 * Create cache key from parameters
 */
const getCacheKey = (params: FoodApiParams = {}): string => {
  return `seasonalfoodguide_${Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
};

/**
 * Check if cached data is still valid
 */
const isCacheValid = (cachedData: CachedData<FoodList>): boolean => {
  // Seasonal data changes very rarely, so cache for a long time
  return Date.now() - cachedData.timestamp < (7 * 24 * 60 * 60 * 1000); // 7 days
};

/**
 * Fetch seasonal food data from Seasonal Food Guide API
 */
export const fetchSeasonalFoodGuideData = async (params: FoodApiParams = {}): Promise<FoodList> => {
  try {
    const cacheKey = getCacheKey(params);
    
    // Check cache first
    const cachedData = apiCache.get(cacheKey);
    if (cachedData && isCacheValid(cachedData)) {
      console.log('Using cached seasonal food guide data');
      return cachedData.data;
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    
    // Add region parameter
    if (params.region) {
      queryParams.append('region', params.region);
    }
    
    // Add month filter if specified
    if (params.month) {
      queryParams.append('month', params.month.toString());
    }
    
    // Add API key if available
    const apiKey = getApiKey();
    if (apiKey) {
      queryParams.append('apiKey', apiKey);
    }

    // Make API request to Seasonal Food Guide
    const url = `https://www.seasonalfoodguide.org/api/v1/foods?${queryParams.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-Key': apiKey || '',
      },
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`Seasonal Food Guide API request failed with status ${response.status}`);
    }

    const apiResponse: SeasonalFoodGuideItem[] = await response.json();
    
    // Convert API data to application format
    const foodList = adaptSeasonalFoodGuideData(apiResponse, params);
    
    // Cache the result
    apiCache.set(cacheKey, {
      data: foodList,
      timestamp: Date.now(),
    });

    return foodList;
  } catch (error) {
    console.error('Failed to fetch data from Seasonal Food Guide:', error);
    throw error;
  }
};