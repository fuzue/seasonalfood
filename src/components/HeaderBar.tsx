import type { FoodList, FoodObject } from "../types/food";
import Fuse from "fuse.js";
import { useRef, useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Menu, Search } from "@mui/icons-material";
import {
  AppBar,
  styled,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Typography
} from "@mui/material";

type Props = {
  ifSearched: boolean;
  food: FoodList;
  onSearch: (query: string, food: FoodList) => void;
  toggleDrawer: () => void;
};

export default function HeaderBar(props: Props) {
  const { t } = useTranslation();
  const query = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (props.ifSearched === false) {
      query.current.value = "";
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const foundFoods = searchFilterFood(props.food);
    props.onSearch(query.current.value, foundFoods);
    event.preventDefault();
  };

  const searchFilterFood = (food: FoodList) => {
    if (query.current.value === "") {
      return food;
    }

    // TODO: Load index pregenerated
    const options = {
      threshold: 0.3,
      keys: [
        {
          name: "name-en",
          getFn: (food: FoodObject) => food.description[0].name,
        },
        {
          name: "name-it",
          getFn: (food: FoodObject) => food.description[1].name,
        },
      ],
    };

    const fuse = new Fuse(food, options);
    const searchText = query.current.value.trim().toLowerCase();
    const searchLanguage: { [lang: string]: string } = {};
    searchLanguage["name-" + i18next.language] = searchText;

    return fuse.search(searchLanguage).map((i) => i.item);
  };

  function leftButton() {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={props.toggleDrawer}
      >
        <Menu />
      </IconButton>
    );
  }

  const SearchIconWrapper = styled("div")(() => ({
    height: "100%",
    aspectRatio: 1,
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create("max-width"),
      width: "100%",
      maxWidth: "0ch",
      "&:focus": {
        maxWidth: "20ch",
      },
    },
  }));

  return (
    <AppBar position="static" sx={{ mb: 1, backgroundColor: "secondary.light" }}>
      <Toolbar>
        {leftButton()}
        <Typography 
      variant="subtitle1" 
      component="div" 
      sx={{ flexGrow: 0, marginRight: 2 }}
    >
      Season Food
    </Typography>
        <Box
          position="relative"
          marginLeft="auto"
          borderRadius=".5rem"
          bgcolor="rgba(255,255,255,.1)"
        > 
          <SearchIconWrapper>
            <IconButton
              sx={{ m: 0 }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <Search />
            </IconButton>
          </SearchIconWrapper>
          <form onSubmit={(e) => handleSubmit(e)}>
            <StyledInputBase
              key="searchInput"
              placeholder={t("Header_searchBar")}
              inputProps={{ "aria-label": "search" }}
              inputRef={query}
              id="search-bar"
            />
          </form>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
