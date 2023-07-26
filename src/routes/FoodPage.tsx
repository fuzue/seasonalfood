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
    width: "24%",
    aspectRatio: 2,
    borderRadius: ".5em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  const ShadowBox = styled(Box)(({ theme }) => ({
    position: "relative",
    boxShadow: `0 2px 4px ${theme.palette.secondary.dark}`,
  }));

  const ImgBox = styled(Box)(() => ({
    position: "relative",
    overflow: "hidden",
    width: "100%",
    aspectRatio: 2,
  }));

  const renderMonths = () => {
    return months.map((month) => {
      let userNumber = Number(month) + 1;
      return (
        <GridBox sx={{ ...monthColor(month), mb: 1 }}>
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
        <Box
          textAlign="right"
          bgcolor={
            seasonStatus === "FoodPage_inSeasonText"
              ? "primary.main"
              : "primary.dark"
          }
        >
          <Typography
            variant="h6"
            pt={1}
            pr={2}
            sx={{ fontWeight: 700 }}
            color="primary.light"
          >
            {t(seasonStatus)}
          </Typography>
        </Box>
        <ImgBox>
          <img
            className="food-image"
            src={`../images/${image}.png`}
            alt={`photo of ${image}`}
          />
        </ImgBox>
        <Typography
            position="absolute"
            variant="h2"
            fontWeight={700}
            color="primary.light"
            textAlign="center"
            top={0}
            sx={{transform: "translateY(-20%)"}}
          >
            {t(
              selectedFood ? selectedFood.description[0].name : "FOOD NOT FOUND"
            )}
          </Typography>
      </ShadowBox>
      <Typography
        variant="h6"
        p={2.5}
        sx={{ fontWeight: 700 }}
        color="primary.dark"
      >
       {t("FoodPage_checkMonths")}
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        py={2}
        justifyContent="space-around"
      >
        {renderMonths()}
      </Stack>
    </Box>
  );
}
