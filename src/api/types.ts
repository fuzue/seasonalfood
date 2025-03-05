import { FoodList, FoodObject } from "../types/food";

// API response structure
export interface ApiResponse<T> {
  data: T;
  meta?: {
    totalCount?: number;
    page?: number;
    pageSize?: number;
  };
  error?: string;
}

// Food data from API
export interface ApiFoodData {
  id: string;
  category: string;
  names: {
    [lang: string]: string;
  };
  image_url: string;
  season_months: number[]; // 1-12 for months when in season
  region?: string;
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

// For caching responses
export interface CachedData<T> {
  data: T;
  timestamp: number;
}

// API request parameters
export interface FoodApiParams {
  region?: string;
  month?: number;
  category?: string;
  lang?: string;
}