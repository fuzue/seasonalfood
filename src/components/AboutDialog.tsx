import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Link,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Browser } from "@capacitor/browser";
//dialog box that opens with each element clicked
export default function AboutDialog() {
  const { t } = useTranslation();

  const openExternalLink = async (url: string) => {
    await Browser.open({ url });
  };

  return (
    <>
      <DialogTitle id="about-dialog-title">
        {t("AboutDialog_title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="about-dialog-description" color="dark-gray">
          <p>{t("AboutDialog_desc1")}</p>
          <p>{t("AboutDialog_desc2")}</p>

          <Typography sx={{ fontWeight: 600 }}>
            {t("AboutDialog_ItalyDisclaimer")}
          </Typography>
          <Typography sx={{ fontWeight: 800, mt: 3 }}>
            {t("AboutDialog_aboutus")}{" "}
            <Link
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                openExternalLink("https://fuzue.tech/");
              }}
            >
              fuzue.tech
            </Link>
            <br />
            {t("AboutDialog_aboutapp")}{" "}
            <Link
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                openExternalLink("https://seasonalfood.fuzue.tech/");
              }}
            >
              {" "}
              {t("AboutDialog_Here")}
            </Link>
          </Typography>
        </DialogContentText>
      </DialogContent>
    </>
  );
}
