import type { FoodList } from "../types/food";

import { useRef, useEffect } from "react";
import {
  AppBar,
  styled,
  alpha,
  Toolbar,
  IconButton,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

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
    return food.filter((item) => {
      return item.description[0].name
        .toLowerCase()
        .includes(query.current.value.trim().toLowerCase());
    });
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 'auto',
    width: "auto"
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
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const StyledAppBar = styled(AppBar)(() => ({
    borderRadius: "2%",
    background: "#13bf8d",
    marginTop: "0",
  }));

  const navigate = useNavigate();
  const location = useLocation();

  function leftButton() {
    if(location.pathname.split("/")[1] === "foodpage") {
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
      )
    }
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={props.toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
    )
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {leftButton()}
        <Search>
          <SearchIconWrapper>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <SearchIcon type="submit" />
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
        </Search>
      </Toolbar>
    </StyledAppBar>
  );
}
