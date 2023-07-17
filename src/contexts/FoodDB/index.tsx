import React from "react"
import { Dispatch } from "react"
import { reducer } from "./reducer"
import { FoodList } from "../../types/food"


export const FoodDBContext = React.createContext<[FoodList, Dispatch<any>]>([
  [] as FoodList,
  () => null
])


export const FoodDBProvider = ({ children, initialState }:{ children: React.ReactNode, initialState: FoodList }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <FoodDBContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </FoodDBContext.Provider>
  )
}
