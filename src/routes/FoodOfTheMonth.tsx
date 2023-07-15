import type { FoodList, FoodCategory, FoodObject } from "../types/food";
import { ChangeEvent, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, styled, alpha } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import RenderFoods from "../components/RenderFoods";
import { useTranslation } from "react-i18next"
import { FoodDBContext } from "../contexts/FoodDB"
import React from "react"

export default function FoodOfTheMonth() {
  const [food, _] = React.useContext(FoodDBContext)
  const { selectedMonthNum  } = useParams();
  const { t } = useTranslation()
  const monthNum = Number(selectedMonthNum) - 1
  const filteredFood:{[foodType:string]: FoodList} = {'Fruits': [], 'Veggies': []}

  //month change arrows function
  const navigate = useNavigate();
  useEffect(() => {
    if(monthNum < 0 || monthNum > 11) {
      return navigate("/NotFound");
    }
  })

  const monthFood = [] as FoodObject[];
  food.forEach(item => {
    if(item.season[monthNum] === true) monthFood.push(item);
  })


  //filters the fruits and vegetables
  const filterFoodType = (monthFood: FoodList, foodCategory: FoodCategory) =>
    monthFood.filter((item) => item.category === foodCategory);
  filteredFood["Fruits"] = filterFoodType(monthFood, "Fruits");
  filteredFood["Veggies"] = filterFoodType(monthFood, "Veggies");
  const num_fruits = filteredFood["Fruits"].length
  const num_veggies = filteredFood["Veggies"].length

  //variables to handle the changing tabs
  const [foodType, setFoodType] = useState("Fruits" as FoodCategory);
  // @ts-ignore
  const handleChange = (event: ChangeEvent<EventTarget>, newFoodCategory: FoodCategory) => {
    setFoodType(newFoodCategory);

  };

  //variables to change month when pressing the arrows
  const prevMonth = monthNum != 0 ? monthNum - 1 : 11;
  const nextMonth = monthNum != 11 ? monthNum + 1 : 0;

  //styled MUI arrows
  const ArrowButton = styled(Link)(({ theme }) => ({
    color: alpha(theme.palette.common.black, 0.75),
    width: "2em",
    "&:hover": {
      color: alpha(theme.palette.common.black, 0.95),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const ItemsBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    margin: "0",
    display: "flex",
  }));
  return (
    <Box>
      <div className="month-container">
        <div className="selected-month">
          <ArrowButton to={`/month/${prevMonth + 1}`}>
            <ArrowLeft />
          </ArrowButton>
          <div className="month-title">
            <h4>{t(`month_${monthNum}`)}</h4>
          </div>
          <ArrowButton to={`/month/${nextMonth + 1}`}>
            <ArrowRight />
          </ArrowButton>
        </div>
            <p className="food-counter-text">
              {t('FoodOfTheMonth_fruitsNumber', { count: num_fruits, fruits: num_fruits})
               + ' ' + t('FoodOfTheMonth_veggiesNumber', { count: num_veggies, veggies: num_veggies})}
            </p>
         
        <div className="button-wrapper">
          <Tabs
            value={foodType}
            onChange={(e, value) => handleChange(e, value)}
            sx={{ fontWeight: 700 }}
            aria-label="tabs for the selection of fruits, vegetables or others"
          >
            <Tab label={t('FoodOfTheMonth_fruitsTabText')} value="Fruits" />
            <Tab label={t('FoodOfTheMonth_vegetablesTabText')} value="Veggies"  />
          </Tabs>
        </div>
        <ItemsBox><RenderFoods foodList={filteredFood[foodType]}/></ItemsBox>
      </div>
      
    </Box>
  );
  
}

