import { currentMonth } from "../utils/utils";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { FoodDBContext } from "../contexts/FoodDB";
import React from "react";

export default function FoodPage() {
  const [food, _] = React.useContext(FoodDBContext);
  const { id } = useParams();
  const { t } = useTranslation();

  const selectedFood = food.find((item) => item.description[0].slug === id);
  const seasonMonths = [] as string[]; //  months array to update the list of months in season
  let seasonStatus = ""; // status of the specific fruit or vegetable

  if (selectedFood === undefined) {
    return <></>;
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedFood) {
      return navigate("/NotFound");
    }
  });
  const months = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  for (let i = 0; i < months.length; i++) {
    if (selectedFood && selectedFood.season[i] === true) {
      seasonMonths.push(months[i]);
      seasonStatus = "FoodPage_notInSeasonText";
      if (seasonMonths.includes(months[currentMonth])) {
        seasonStatus = "FoodPage_inSeasonText";
      }
    }
  }

  const image = selectedFood ? selectedFood.image.toLowerCase() : "";

  const monthColor = (month: string) => {
    if (seasonMonths.includes(month)) {
      return {
        backgroundColor: "primary.dark",
        color: "primary.light",
        boxShadow: `0 2px 4px #888888`,
      };
    } else {
      return {
        color: "gray",
        backgroundColor: "secondary.light",
      };
    }
  };

  const GridBox = styled(Box)(() => ({
    width: "6em",
    borderRadius: ".5em",
    height: "2.5em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    my: 1
  }));

  const ShadowBox = styled(Box)(({ theme }) => ({
    boxShadow: `0 2px 4px ${theme.palette.secondary.dark}`,
  }));

  const ImgBox = styled(Box)(() => ({
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "12rem"
  }));

  const renderMonths = () => {
    return months.map((month) => {
      let userNumber = Number(month) + 1;
      return (
        <GridBox sx={{...monthColor(month), m: .6}}>
          <Link to={`/month/${userNumber}`}>
            <Typography>{t(`month_${month}`)}</Typography>
          </Link>
        </GridBox>
      );
    });
  };

  return (
    <Box justifyContent="space-between" alignItems="center">
      <ShadowBox>
        <Typography
          variant="h6"
          px={2}
          py={0.5}
          bgcolor="primary.dark"
          color="primary.light"
          textAlign="center"
        >
          {t(
            selectedFood ? selectedFood.description[0].name : "FOOD NOT FOUND"
          )}
        </Typography>
        <ImgBox>
          <img
            className="food-image"
            src={`../images/${image}.png`}
            alt={`photo of ${image}`}
          />
        </ImgBox>
        <Box
          textAlign="center"
          bgcolor={
            seasonStatus === "FoodPage_inSeasonText"
              ? "primary.main"
              : "secondary.main"
          }
        >
          <Typography variant="h6" py={1} sx={{ fontWeight: 700 }} color="primary.light">
            {t(seasonStatus)}
          </Typography>
        </Box>
      </ShadowBox>
      <Stack direction="row" flexWrap="wrap" py={1} justifyContent="space-around">
        {renderMonths()}
      </Stack>
    </Box>
  );
}
