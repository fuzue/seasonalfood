import type { FoodList, FoodObject } from "../types/food";
import Fuse from 'fuse.js'
import { useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { ArrowBackIosNew, Menu, Search } from "@mui/icons-material";
import {
  AppBar,
  styled,
  alpha,
  Toolbar,
  IconButton,
  InputBase,
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
        { name: 'name-en', getFn: (food:FoodObject) => food.description[0].name },
        { name: 'name-it', getFn: (food:FoodObject) => food.description[1].name }
      ]
    }

    const fuse = new Fuse(food, options)
    const searchText = query.current.value.trim().toLowerCase()
    const searchLanguage:{[lang:string]:string} = {}
    searchLanguage["name-" + i18next.language] = searchText

    return fuse.search(searchLanguage).map((i) => i.item)
  };

  const SearchBar = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: "auto",
    width: "auto",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
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
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("max-width"),
      width: "100%",
      maxWidth: "0ch",
      "&:focus": {
        maxWidth: "20ch",
      },
    },
  }));

  const StyledAppBar = styled(AppBar)(() => ({
    background: 'primary.main',
    marginTop: "0"
  }));

  const navigate = useNavigate();
  const location = useLocation();

  function leftButton() {
    if (location.pathname.split("/")[1] === "foodpage") {
      return (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNew />
        </IconButton>
      );
    }
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

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {leftButton()}
        <SearchBar>
          <SearchIconWrapper>
            <IconButton
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
              placeholder={t("Header_searchBar")}
              inputProps={{ "aria-label": "search" }}
              inputRef={query}
              id="search-bar"
            />
          </form>
        </SearchBar>
      </Toolbar>
    </StyledAppBar>
  );
}
