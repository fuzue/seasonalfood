import type { FoodList } from "../types/food";
import Item from "./Item";
import { Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface RenderFoodProps {
  foodList: FoodList;
}

interface RenderFoodProps {
  foodList: FoodList;
}

//render the grid of foods
const RenderFoods: FunctionComponent<RenderFoodProps> = (
  props: RenderFoodProps
) => {
  const foodList = props.foodList;
  const foodItems = foodList.map((item, key) => {
    return <Item key={key} {...item} />;
  });
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      gap={"16px"}
      marginBottom="8em"
    >
      {foodItems}
    </Stack>
  );
};

export default RenderFoods;
