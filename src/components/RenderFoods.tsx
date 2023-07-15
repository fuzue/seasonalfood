import type { FoodList } from "../types/food";
import Item from "./Item";
import { Grid, styled } from "@mui/material";
import { FunctionComponent } from "react"

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "0.25em",
}));

interface RenderFoodProps {
  foodList: FoodList
}

//render the grid of foods
const RenderFoods:FunctionComponent<RenderFoodProps> = (props:RenderFoodProps) => {
  const foodList = props.foodList
  const foodItems = foodList.map((item, key) => {
    return (
      <Grid item xs={4} key={key}>
        <Item key={key} {...item} />
      </Grid>
    );
  });
  return (
    <StyledGrid container spacing={2}>
      {foodItems}
    </StyledGrid>
  );
}

export default RenderFoods;
