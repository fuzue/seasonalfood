import { useState, useEffect } from 'react';
import { fetchFoodData } from '../services/foodApiService';
import { FoodApiParams } from '../types';
import { FoodList } from '../../types/food';

interface UseFoodDataReturn {
  data: FoodList;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching food data from the API
 */
export const useFoodData = (params: FoodApiParams = {}): UseFoodDataReturn => {
  const [data, setData] = useState<FoodList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const foodData = await fetchFoodData(params);
      setData(foodData);
    } catch (err) {
      console.error('Error fetching food data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]); // Re-fetch when params change

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};