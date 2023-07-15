import { currentMonth } from "../utils/utils";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { FoodDBContext } from "../contexts/FoodDB"
import React from "react"

export default function FoodPage() {
  const [ food, _ ] = React.useContext(FoodDBContext)
  const { id } = useParams();
  const { t } = useTranslation();

  const selectedFood = food.find(item => item.description[0].slug === id);
  const seasonMonths = [] as string[]; //  months array to update the list of months in season
  let seasonStatus = ""; // status of the specific fruit or vegetable

  if (selectedFood === undefined) {
    return (<></>)
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedFood) {
      return navigate("/NotFound");
    }
  })
  const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  for (let i = 0; i < months.length; i++) {
    if (selectedFood && selectedFood.season[i] === true) {
      seasonMonths.push(months[i]);
      seasonStatus = 'FoodPage_notInSeasonText';
      if (seasonMonths.includes(months[currentMonth])) {
        seasonStatus = 'FoodPage_inSeasonText';
      }
    }
  }

  const image = selectedFood ? selectedFood.image.toLowerCase() : '';

  const monthColor = (month: string) => {
    if (seasonMonths.includes(month)) {
      return {
        backgroundColor: 'primary.main',
        color: 'primary.light',
        boxShadow: '3px 4px 8px #888888'
      }
    }
    else {
      return {
        color: 'gray',
        backgroundColor: 'primary.light'
      }
    }
  };

  const GridBox = styled(Box)(() => ({
    width: '6em',
    borderRadius: '6px',
    height: '2.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const ImgBox = styled(Box)(() => ({
    objectFit: "cover",
    margin: "1em",
    width: "40%",
    maxHeight: "160px",
  }));

  const renderMonths = () => {
    return months.map((month) => {
      let userNumber = Number(month) + 1
      return (
        <Grid item
          className="grid-item"
          xs={4}
          key={month.toString()}
        >
          <GridBox
            sx={monthColor(month)}>
            <Link to={`/month/${userNumber}`}>
              {t(`month_${month}`)}
            </Link>
          </GridBox>
        </Grid>
      );
    });
  }

  return (
    <Box
      marginX={1}
      justifyContent="space-between"
      alignItems="center">
      <Box
        display='flex'
        justifyContent='center'
        textAlign='left'
        marginTop='1.5em'
      >
        <ImgBox>
          <img className='foodPage-image' src={`../images/${image}.png`} alt={`photo of ${image}`} />
        </ImgBox>
        <Box
          marginLeft='1em'
          marginTop='0'
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="center"
          width="50%">
          <Typography variant="h6"> {/* typescript problem */}
            {t(selectedFood?selectedFood.description[0].name:'FOOD NOT FOUND')}:
          </Typography>
          <Typography>{t(seasonStatus)}</Typography>
        </Box>
      </Box>

      {/* BOTTOM GRID WITH MONTHS */}
      <Box
        sx={{
          margin: '1em ',
        }}>
        <Typography marginY={2} variant="h6" >
          {t('FoodPage_monthsInSeason')}
        </Typography>
        <Grid container
          direction="row"
          spacing={3}
        >
          {renderMonths()}
        </Grid>
      </Box>
    </Box>
  );
}
