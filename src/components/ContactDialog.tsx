import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Box,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTranslation } from "react-i18next";
import { Browser } from "@capacitor/browser";

//dialog box that opens with each element clicked
export default function ContactDialog() {
  const { t } = useTranslation();

  const openExternalLink = async (url: string) => {
    await Browser.open({ url });
  };
  return (
    <>
      <DialogTitle id="contact-dialog-title">
        {t("ContactDialog_title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="contact-dialog-description" color="dark-gray">
          {t("ContactDialog_text1")}
          <Link
            underline="hover"
            color="inherit"
            onClick={(e) => {
              e.preventDefault();
              openExternalLink("https://seasonalfood.fuzue.tech/");
            }}
          >
            {/* {t("ContactDialog_text2")} */}
          </Link>
          &nbsp;{t("ContactDialog_text3")}{" "}
          <Link
            underline="hover"
            sx={{ fontWeight: 800 }}
            onClick={(e) => {
              e.preventDefault();
              openExternalLink("https://github.com/fuzue/seasonalfood");
            }}
          >
            {" "}
            {t("ContactDialog_text4")}
          </Link>
          <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
            <AlternateEmailIcon sx={{ mr: 1 }} />
            <Link
              underline="hover"
              sx={{ fontWeight: 800 }}
              href="mailto:contact@fuzue.tech"
            >
              contact@fuzue.tech
            </Link>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "start", mt: 1 }}>
            <GitHubIcon sx={{ mr: 1 }} />
            <Link
              underline="hover"
              sx={{ fontWeight: 800 }}
              onClick={(e) => {
                e.preventDefault();
                openExternalLink("https://github.com/fuzue/seasonalfood");
              }}
            >
              GitHub Repo
            </Link>
          </Box>
        </DialogContentText>
      </DialogContent>
    </>
  );
}
