import type { FoodList, FoodCategory, FoodObject } from "../types/food";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FoodDBContext } from "../contexts/FoodDB";
import RenderFoods from "../components/RenderFoods";
import {
  Box,
  Tab,
  Tabs,
  styled,
  alpha,
  Chip,
  Typography,
  Stack,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

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

  //variables to change month when pressing the arrows
  const prevMonth = monthNum != 0 ? monthNum - 1 : 11;
  const nextMonth = monthNum != 11 ? monthNum + 1 : 0;

  //styled MUI arrows
  const ArrowButton = styled(Link)(({ theme }) => ({
    color: alpha(theme.palette.text.secondary, 0.75),
    "&:hover": {
      color: alpha(theme.palette.text.secondary, 0.95),
    },
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
    width: "auto",
  }));

  const ShadowBox = styled(Stack)(({ theme }) => ({
    boxShadow: `0 2px 4px ${theme.palette.secondary.dark}`,
  }));

  return (
    <Box>
      <ShadowBox
        direction="row"
        justifyContent="space-between"
        bgcolor="primary.dark"
        color="primary.light"
        boxShadow="0 2px 4px #332323"
      >
        <ArrowButton to={`/month/${prevMonth + 1}`}>
          <ArrowLeft />
        </ArrowButton>
        <Typography variant="h6" display="flex" alignItems="center">
          {t(`month_${monthNum}`)}
        </Typography>
        <ArrowButton to={`/month/${nextMonth + 1}`}>
          <ArrowRight />
        </ArrowButton>
      </ShadowBox>
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
      <Box m={1}>
        <RenderFoods foodList={filteredFood[foodType]} />
      </Box>
    </Box>
  );
}
