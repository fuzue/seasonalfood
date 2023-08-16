import type { FoodList } from "../types/food";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SearchResult from "../components/SearchResult";
import SideBarList from "../components/SideBarList";

/* MUI IMPORTS */
import {
  createTheme,
  Box,
  Drawer,
  ThemeProvider,
  Stack,
  Typography,
  styled,
  alpha,
} from "@mui/material";
import SideBarDialog from "../components/SideBarDialog";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { t } from "i18next";

//BASIC MUI COLORS AND BREAKPOINTS
const theme = createTheme({
  palette: {
    text: {
      primary: "#674747",
      secondary: "#999"
    },
    primary: { 
      main: "#5a175d", //purple
      light: "#f3ecf1", //cream - bg-color
      dark: "#67074a", // purple/red
    },
    secondary: {
      main: "#05878a", //blue-green light
      light: "#074d6790", // blue-green transparent
    },

    //OP 1 DE CORES
    /* primary: { //green
      main: "#36a859",
      light: "#f3ecf1", //cream - bg-color
      dark: "#2c6e49",
    },
    secondary: {
      main: "#d55314", //orange
      light: "#ffc9b9", //pink
    }, */

  },
});

function Layout({ food }: { food: FoodList }) {
  const { selectedMonthNum } = useParams();
  const monthNum = Number(selectedMonthNum) - 1;

  //search bar code
  const [ifSearched, setIfSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([] as FoodList);
  const closeModal = () => setIfSearched(false);

  const onSearch = (query: string, food: FoodList) => {
    if (query != "") {
      setIfSearched(true);
      setSearchResults(food);
    }
  };

  // open side bar code
  const [state, setState] = useState(false);
  const toggleDrawer = () => setState(!state);

  //Side bar dialog code that opens with each element clicked
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const handleClose = () => setOpen(false);
  const handleClickOpen = (itemClickedName: string) => {
    setOpen(true);
    setDialogType(itemClickedName);
  };

    //variables to change month when pressing the arrows
    const prevMonth = monthNum != 0 ? monthNum - 1 : 11;
    const nextMonth = monthNum != 11 ? monthNum + 1 : 0;

    //styled MUI arrows
    const ArrowButton = styled(Link)(({ theme }) => ({
      color: alpha(theme.palette.primary.light, 0.75),
      "&:hover": {
        color: alpha(theme.palette.primary.light, 0.95),
      },
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1),
      width: "auto",
    }));

  const ShadowBox = styled(Stack)(({ theme }) => ({
    boxShadow: `0 2px 4px ${theme.palette.secondary}`,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Drawer open={state} onClick={toggleDrawer}>
        <SideBarList handleClickOpen={handleClickOpen} />
      </Drawer>
      <Stack bgcolor="primary.light" height="100%" maxWidth={1024} mx="auto" p={1}>
        <HeaderBar
          onSearch={onSearch}
          toggleDrawer={toggleDrawer}
          food={food}
          ifSearched={ifSearched}
        />
        <ShadowBox
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="secondary.main"
          color="primary.light"
          boxShadow="0 2px 4px #332323"
        >
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
        </ShadowBox>
        {ifSearched ? (
          <SearchResult
            searchResults={searchResults}
            ifSearched={ifSearched}
            closeModal={closeModal}
          />
        ) : null}
        <SideBarDialog
          open={open}
          dialogType={dialogType}
          handleClose={handleClose}
        />
        <Box flexGrow={1} overflow="hidden">
          <Outlet />
        </Box>
      </Stack>
    </ThemeProvider>
  );
}

export default Layout;
