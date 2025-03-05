import React, { useContext, useEffect } from "react";
import { Dispatch } from "react";
import { reducer, initialState as defaultInitialState, IFoodDBState, FoodDBAction } from "./reducer";
import { FoodList } from "../../types/food";
import { fetchSeasonalFoodData } from "../../api";
import { FoodApiParams } from "../../api/types";

// Define context type
interface FoodDBContextType {
  state: IFoodDBState;
  dispatch: Dispatch<FoodDBAction>;
  refreshData: (params?: FoodApiParams) => Promise<void>;
}

// Create context with default values
export const FoodDBContext = React.createContext<FoodDBContextType>({
  state: defaultInitialState,
  dispatch: () => null,
  refreshData: async () => {}
});

interface FoodDBProviderProps {
  children: React.ReactNode;
  initialState?: FoodList;
  apiParams?: FoodApiParams;
}

export const FoodDBProvider: React.FC<FoodDBProviderProps> = ({ 
  children, 
  initialState, 
  apiParams = {}
}) => {
  // Initialize the reducer with either the provided initial state or default empty state
  const [state, dispatch] = React.useReducer(
    reducer, 
    initialState ? {
      ...defaultInitialState,
      data: initialState,
      lastUpdated: Date.now()
    } : defaultInitialState
  );

  // Function to refresh data from API
  const refreshData = async (params: FoodApiParams = apiParams) => {
    try {
      dispatch({ type: "REFRESH" });
      const data = await fetchSeasonalFoodData(params);
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ 
        type: "ERROR", 
        payload: error instanceof Error ? error : new Error("Failed to fetch food data") 
      });
    }
  };

  // Initial load from API if no initial state was provided
  useEffect(() => {
    if (!initialState) {
      refreshData();
    }
  }, []);

  return (
    <FoodDBContext.Provider value={{ state, dispatch, refreshData }}>
      {children}
    </FoodDBContext.Provider>
  );
};

// Custom hook for using the food database
export const useFoodDB = () => {
  const context = useContext(FoodDBContext);
  
  if (!context) {
    throw new Error("useFoodDB must be used within a FoodDBProvider");
  }
  
  return context;
};
