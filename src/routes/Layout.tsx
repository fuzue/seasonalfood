import type { FoodList } from "../types/food";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SearchResult from "../components/SearchResult";
import SideBarDialog from "../components/SideBarDialog";

/* MUI IMPORTS */
import {
  createTheme,
  styled,
  Box,
  Drawer,
  ListItemButton,
  ListItem,
  ThemeProvider,
  Typography,
  Stack,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
//import { Close } from "@mui/icons-material";

//BASIC MUI COLORS AND BREAKPOINTS
const theme = createTheme({
  palette: {
    primary: {
      main: "#13bf8d",
      light: "#f4fbeb",
      dark: "#555766",
    },
    secondary: {
      main: "#ff7664", //red
      dark: "#4071d8", //blue
    },
  }
});

function Layout({ food }: { food: FoodList }) {
  const MainBox = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    margin: "0 auto",
    paddingBottom: "1em",
    minHeight: "100%",
    boxShadow: "3px 4px 8px #888888",
  }));

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

  const { i18n } = useTranslation();

  const lngs = {
    en: { nativeName: "English" },
    it: { nativeName: "Italiano" },
  } as { [key: string]: { nativeName: string } };

  const SelectLang = (
    <FormControl sx={{ minWidth: '100%' }} size="small">
      <InputLabel id="demo-select-small-label">Language</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={i18n.resolvedLanguage}
        label="Language"
        onChange={(event: SelectChangeEvent) => i18n.changeLanguage(event.target.value)}
      >
        {Object.keys(lngs).map((lng) => (
          <MenuItem key={lng} selected={i18n.resolvedLanguage === lng} value={lng}>{lngs[lng].nativeName}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const sideBarList = (
    <Stack
      height="100%"
      sx={{
        width: 250,
        textTransform: "uppercase",
        color: "#3e3e3e",
        fontWeight: "bold",
      }}
      role="presentation"
    >
      <ListItem
        sx={{ my: 1.5 }}
      >
        <Typography variant="h6" display="block" gutterBottom sx={{ m: 0 }}>
          SEASONAL FOOD
        </Typography>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleClickOpen("about")}>
          <Typography variant="button" display="block" gutterBottom>
            about the app
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleClickOpen("contribute")}>
          <Typography variant="button" display="block" gutterBottom>
            contribute
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleClickOpen("contact")}>
          <Typography variant="button" display="block" gutterBottom>
            contact us
          </Typography>
        </ListItemButton>
      </ListItem>
      <Stack direction="row" sx={{ mt: "auto", mb: 1.5, mx: 1.5 }}>
        {SelectLang}
      </Stack>
    </Stack>
  );

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
      <MainBox bgcolor="primary.white" className="main-container">
        <Drawer open={state} onClick={toggleDrawer}>
          {sideBarList}
        </Drawer>
        <div className="main-layout">
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

          <Outlet />
        </div>
      </MainBox>
    </ThemeProvider>
  );
}

export default Layout;
