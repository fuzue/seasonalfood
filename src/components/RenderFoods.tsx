import type { FoodList } from "../types/food";
import Item from "./Item";
import { Box, Stack } from "@mui/material";
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
  const foodItems = foodList.map((item, key) => {
    return (
      <Box sx={{mb: 1, mx: '5px', display: 'flex', flexGrow: 1, justifyContent: "center"}} key={key}>
        <Item {...item} />
      </Box>
    );
  });
  return (
    <Stack direction="row" flexWrap="wrap">
      {foodItems}
    </Stack>
  );
}

export default RenderFoods;
