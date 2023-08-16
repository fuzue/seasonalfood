import type { FoodObject } from "../types/food";

import { Link, useParams } from "react-router-dom";
import { Box, Stack, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const ImgBox = styled(Stack)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  aspectRatio: 1,
  boxShadow: "3px 4px 8px #888888",
  overflow: "clip",
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.primary.main,
}));

function Item(props: FoodObject) {
  const { t } = useTranslation();
  const image = props.image.toLowerCase();
  const { selectedMonthNum } = useParams();
  return (
    <Box
      sx={{ flexGrow: 1, width: "100%", maxWidth: "30%", minWidth: 90 }}
    >
      <Link to={`/${props.description[0].slug}/${selectedMonthNum}`}>
        <ImgBox>
          <Box position="relative" flexGrow={1}>
            <img
              className="food-image"
              src={`../images/${image}.png`}
              alt={`image of ${image}`}
            />
          </Box>
          <Box position="relative" height="20%" sx={{ textAlign: 'center'}}>
            <Typography
              top={0}
              fontSize="max(1rem, min(4.5vw, 3rem))"
              fontWeight={400}
              sx={{ p: "0.25em", transform: "translateY(-20%)" }}
            >
              {t(props.description[0].name)}
            </Typography>
          </Box>
        </ImgBox>
      </Link>
    </Box>
  );
}

export default Item;
