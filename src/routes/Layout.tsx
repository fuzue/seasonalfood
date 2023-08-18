import type { FoodList } from "../types/food";
import { Outlet } from "react-router-dom";
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
  Stack
  } from "@mui/material";
import SideBarDialog from "../components/SideBarDialog";
import MonthBar from "../components/MonthBar";

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

  //search bar code
  const [currentSearch, setCurrentSearch] = useState('');
  const [ifSearched, setIfSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([] as FoodList);
  const closeModal = () => setIfSearched(false);

  const onSearch = (query: string, food: FoodList) => {
    if (query != "") {
      setCurrentSearch(query)
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
        <MonthBar />
        {ifSearched ? (
          <SearchResult
            currentSearch={currentSearch}
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
