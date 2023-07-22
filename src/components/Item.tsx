import type { FoodObject } from "../types/food"

import { Link } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";


const ImgBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: "6em",
  boxShadow: "3px 4px 8px #888888",
  textAlign: "center",
  backgroundColor:"#fefefe",
  [theme.breakpoints.down("xs")]: {
    width: "115px",
  },
}));

function Item(props: FoodObject) {
  const { t } = useTranslation()
  const image = props.image.toLowerCase();
  return (
    <Link to={`/foodpage/${props.description[0].slug}`}>
      <ImgBox>
        <img
          className="food-image"
          src={`../images/${image}.png`}
          alt={`image of ${image}`}
        />
        <Typography sx={{ paddingBottom: "0.25em" }}>
          {t(props.description[0].name)}
        </Typography>
      </ImgBox>
    </Link>
  );
}

export default Item;
