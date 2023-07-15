import { FoodList } from "../../types/food"

export interface IFoodDBState {
  foodDB: FoodList
}

export const reducer:React.Reducer<FoodList, any>  = (state, action) => {
  switch (action.type) {
    case "initDB":
      console.log('PAYLOAD', action.payload)
      return { ...state, foodDB: action.payload };

    default:
      return state
  }
}

export const initialState = { foodDB: {} }
