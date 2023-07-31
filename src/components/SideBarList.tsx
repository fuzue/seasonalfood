import SelectLang from "./SelectLang";
/* MUI IMPORTS */
import {
  ListItemButton,
  ListItem,
  Typography,
  Stack,
  Divider
} from "@mui/material";

export default function SideBarList(props: any) {
  return (
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
      <ListItem sx={{ my: 1.5 }}>
        <Typography variant="h6" display="block" gutterBottom sx={{ m: 0 }}>
          SEASONAL FOOD
        </Typography>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={() => props.handleClickOpen("about")}>
          <Typography variant="button" display="block" gutterBottom>
            about the app
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => props.handleClickOpen("contribute")}>
          <Typography variant="button" display="block" gutterBottom>
            contribute
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => props.handleClickOpen("contact")}>
          <Typography variant="button" display="block" gutterBottom>
            contact us
          </Typography>
        </ListItemButton>
      </ListItem>
      <Stack direction="row" sx={{ mt: "auto", mb: 1.5, mx: 1.5 }}>
        <SelectLang />
      </Stack>
    </Stack>
  );
}
