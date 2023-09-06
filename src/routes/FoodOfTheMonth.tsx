import type { FoodList, FoodCategory, FoodObject } from "../types/food";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FoodDBContext } from "../contexts/FoodDB";
import RenderFoods from "../components/RenderFoods";
import {
  Box,
  Tab,
  Tabs,
  Chip,
  Stack,
} from "@mui/material";

export default function FoodOfTheMonth() {
  const [food, _] = React.useContext(FoodDBContext);
  const { selectedMonthNum } = useParams();
  const { t } = useTranslation();
  const monthNum = Number(selectedMonthNum) - 1;
  const filteredFood: { [foodType: string]: FoodList } = {
    Fruits: [],
    Veggies: [],
  };

  //month change arrows function
  const navigate = useNavigate();
  useEffect(() => {
    if (monthNum < 0 || monthNum > 11) {
      return navigate("/NotFound");
    }
  });

  const monthFood = [] as FoodObject[];
  food.forEach((item) => {
    if (item.season[monthNum] === true) monthFood.push(item);
  });

  //filters the fruits and vegetables
  const filterFoodType = (monthFood: FoodList, foodCategory: FoodCategory) =>
    monthFood.filter((item) => item.category === foodCategory);
  filteredFood["Fruits"] = filterFoodType(monthFood, "Fruits");
  filteredFood["Veggies"] = filterFoodType(monthFood, "Veggies");
  const num_fruits = filteredFood["Fruits"].length;
  const num_veggies = filteredFood["Veggies"].length;

  //variables to handle the changing tabs
  const [foodType, setFoodType] = useState("Fruits" as FoodCategory);
  // @ts-ignore
  const handleChange = (newFoodCategory: FoodCategory) => {
    setFoodType(newFoodCategory);
  };

 

  return (
    <Stack height="100%">
      <Tabs
        value={foodType}
        onChange={(_, value) => handleChange(value)}
        variant="fullWidth"
        sx={{ fontWeight: 700 }}
        aria-label="tabs for the selection of fruits, vegetables or others"
      > 
        <Tab
          label={
            <span>
              <Chip label={num_fruits} sx={{ mr: 1 }} size="small" />
              {t("FoodOfTheMonth_fruitsTabText")}
            </span>
          }
          value="Fruits"
        />
        <Tab
          label={
            <span>
              <Chip label={num_veggies} sx={{ mr: 1 }} size="small" />
              {t("FoodOfTheMonth_vegetablesTabText")}
            </span>
          }
          value="Veggies"
        />
      </Tabs>
      <Box flexGrow={1} my={2} overflow="auto">
        <RenderFoods foodList={filteredFood[foodType]} />
      </Box>
    </Stack>
  );
}
