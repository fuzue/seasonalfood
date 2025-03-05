import { FoodList } from "../../types/food"

export interface IFoodDBState {
  data: FoodList;
  loading: boolean;
  error: Error | null;
  lastUpdated: number | null;
}

export type FoodDBAction = 
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: FoodList }
  | { type: "ERROR"; payload: Error }
  | { type: "REFRESH" };

export const initialState: IFoodDBState = {
  data: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const reducer: React.Reducer<IFoodDBState, FoodDBAction> = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case "SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        lastUpdated: Date.now()
      };
      
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case "REFRESH":
      // Keep existing data but mark as loading again
      return {
        ...state,
        loading: true,
        error: null
      };
      
    default:
      return state;
  }
}
