import type { FoodList } from "../types/food";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SearchResult from "../components/SearchResult";
import SideBarList from "../components/sideBarList";

/* MUI IMPORTS */
import {
  createTheme,
  Box,
  Drawer,
  ThemeProvider,
} from "@mui/material";
import SideBarDialog from "../components/SideBarDialog";

//BASIC MUI COLORS AND BREAKPOINTS
const theme = createTheme({
  palette: {
    text: {
      primary: "#674747",
      secondary: "#999"
    },
    primary: {
      main: "#829460",
      light: "#EEEEEE",
      dark: "#674747",
    },
    secondary: {
      main: "#F96666", //red
      light: "#DBDBDB",
      dark: "#332323"
    },
  },
});

function Layout({ food }: { food: FoodList }) {
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

  return (
    <ThemeProvider theme={theme}>
      <Drawer open={state} onClick={toggleDrawer}>
        <SideBarList handleClickOpen={handleClickOpen} />
      </Drawer>
      <Box bgcolor="primary.light" height="100%">
        <HeaderBar
          onSearch={onSearch}
          toggleDrawer={toggleDrawer}
          food={food}
          ifSearched={ifSearched}
        />
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
        <Box maxWidth={520} mx="auto">
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
