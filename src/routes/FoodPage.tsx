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
        backgroundColor: "secondary.dark",
        color: "primary.light",
        boxShadow: `0 2px 4px #888888`,
      };
    } else {
      return {
        color: "primary.main",
        backgroundColor: "primary.light",
        opacity: ".5"
      };
    }
  };

  const GridBox = styled(Link)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: 2,
    width: '25%',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.125rem',
      fontWeight: '400'
    },
  }));

  const ImgBox = styled(Box)(() => ({
    position: "relative",
    overflow: "hidden",
    width: "15%",
    minWidth: 100,
    aspectRatio: 1,
    mx: "0.5em",
   }));

  const renderMonths = () => {
    return months.map((month) => {
      let userNumber = Number(month) + 1;
      return (
        <GridBox key={month} sx={{ ...monthColor(month), m: 1 }} to={`/month/${userNumber}`}>
          <Typography>{t(`month_${month}`)}</Typography>
        </GridBox>
      );
    });
  };

  return (
    <Stack
      width="100%"
      height="100%"
      overflow="auto"
      my={1.5}
    >
      <Stack direction="row" width="100%">
        <ImgBox borderRadius={1}>
          <img
            className="food-image"
            src={`${import.meta.env.VITE_BASE_URL}images/${image}.png`}
            alt={`photo of ${image}`}
          />
        </ImgBox>
        <Stack px={2}>
          <Typography
            color={ seasonStatus === "FoodPage_inSeasonText" ? "primary.main" : "secondary.main"}>
            {t(seasonStatus)}
          </Typography>
          <Typography
            variant="h4"
            mt="auto"
            sx={{ fontWeight: 700 }}
            color="secondary.main"
          >
            {t(
              selectedFood ? selectedFood.description[0].name : "FOOD NOT FOUND"
            )}
          </Typography>
          <Typography
            fontWeight={700}
            color={seasonStatus === "FoodPage_inSeasonText" ? "secondary.main" : "primary.main"}>
            {t(seasonStatus)}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        variant="h5"
        mt={3}
        sx={{ fontWeight: 700 }}
        color="secondary.dark"
      >
        {t("FoodPage_monthsInSeason")}
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        py={2}
        justifyContent="space-around"
      >
        {renderMonths()}
      </Stack>
    </Stack>
  );
}
