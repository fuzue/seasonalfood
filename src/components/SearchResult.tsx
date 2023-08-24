import { ReactElement, forwardRef } from "react";
import type { FoodList } from "../types/food";
import Item from "./Item";
import {
  Box,
  Typography,
  Dialog,
  Slide,
  IconButton,
  Stack,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";

type Props = {
  currentSearch: string;
  searchResults: FoodList;
  ifSearched: boolean;
  closeModal: () => void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SearchResult(props: Props) {
  const { currentSearch, searchResults, ifSearched, closeModal } = props;

  const foodItems = searchResults.map((item, key) => {
    return <Item key={key} {...item} />;
  });

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={ifSearched}
      onClose={closeModal}
      aria-labelledby="search results"
      aria-describedby="the results of your search are shown here"
      TransitionComponent={Transition}
    >
      <Stack direction="row" alignItems="center" p={2}>
        <Typography variant="h5" component="div">Search: {currentSearch}</Typography>
        <IconButton
          sx={{ml: "auto" }}
          edge="start"
          color="inherit"
          onClick={closeModal}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </Stack>
      <Box p={2}>
        {searchResults.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">ITEM NOT FOUND</Typography>
          </Box>
        ) : (
          <Stack
            flexGrow={1}
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={1.5}
            maxWidth={1024}
            width="100%"
            mx="auto"
          >
            {foodItems}
          </Stack>
        )}
      </Box>
    </Dialog>
  );
}

export default SearchResult;
