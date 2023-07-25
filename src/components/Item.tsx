import type { FoodObject } from "../types/food"

import { Link } from "react-router-dom";
import { Box, Stack, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";


const ImgBox = styled(Stack)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: "7em",
  height: "7em",
  boxShadow: "3px 4px 8px #888888",
  overflow: "clip",
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.primary.dark
}));

function Item(props: FoodObject) {
  const { t } = useTranslation()
  const image = props.image.toLowerCase();
  return (
    <Link to={`/foodpage/${props.description[0].slug}`}>
      <ImgBox>
        <Box position="relative" flexGrow={1}>
          <img
            className="food-image"
            src={`../images/${image}.png`}
            alt={`image of ${image}`}
          />
        </Box>
        <Typography textAlign="center" sx={{ py: "0.25em" }}>
          {t(props.description[0].name)}
        </Typography>
      </ImgBox>
    </Link>
  );
}

export default Item;
