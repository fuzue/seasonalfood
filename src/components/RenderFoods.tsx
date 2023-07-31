import type { FoodList } from "../types/food";
import Item from "./Item";
import { Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface RenderFoodProps {
  foodList: FoodList
}

interface RenderFoodProps {
  foodList: FoodList
}

//render the grid of foods
const RenderFoods:FunctionComponent<RenderFoodProps> = (props:RenderFoodProps) => {
  const foodList = props.foodList
  const foodItems = foodList.map((item ) => {
    return (
      <Item {...item} />
    );
  });
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="space-between" gap={1.5}>
      {foodItems}
    </Stack>
  );
}

export default RenderFoods;
