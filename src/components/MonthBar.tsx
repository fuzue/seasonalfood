import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Stack, Typography, alpha, styled } from "@mui/material";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"

const MonthBar = () => {
  const { t } = useTranslation();
  const { selectedMonthNum } = useParams();
  const monthNum = Number(selectedMonthNum) - 1;

  //variables to change month when pressing the arrows
  const prevMonth = monthNum != 0 ? monthNum - 1 : 11;
  const nextMonth = monthNum != 11 ? monthNum + 1 : 0;

  //styled MUI arrows
  const ArrowButton = styled(Link)(({ theme }) => ({
    color: alpha(theme.palette.primary.light, 0.75),
    "&:hover": {
      color: alpha(theme.palette.primary.light, 1),
    },
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
    width: "auto",
  }));

  const ShadowBox = styled(Stack)(({ theme }) => ({
    boxShadow: `0 2px 4px ${theme.palette.text.primary}`,
  }));

  return (
    <ShadowBox
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap="18px"
      bgcolor="primary.main"
      color="primary.light"
      boxShadow="0 2px 4px #332323"
    >
      {selectedMonthNum ? (
        <Fragment>
          <ArrowButton to={`/month/${prevMonth + 1}`}>
            <ArrowLeft />
          </ArrowButton>
          <Link to={`/month/${selectedMonthNum}`}>
            <Typography variant="h6" display="flex" alignItems="center">
              {t(`month_${monthNum}`)}
            </Typography>
          </Link>
          <ArrowButton to={`/month/${nextMonth + 1}`}>
            <ArrowRight />
          </ArrowButton>
        </Fragment>
      ) : (
        <Fragment>
          <ArrowButton to={`/`}>
            <ArrowLeft />
            <Typography>{t("MonthPage_return_to_current_month")} </Typography>
          </ArrowButton>
        </Fragment>
      )}
    </ShadowBox>
  );
};

export default MonthBar;
