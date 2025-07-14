import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Browser } from "@capacitor/browser";

//dialog box that opens with each element clicked
export default function ContributeDialog() {
  const { t } = useTranslation();

  const openExternalLink = async (url: string) => {
    await Browser.open({ url });
  };

  return (
    <>
      <DialogTitle id="contribute-dialog-title">
        {t("ContributeDialog_title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="contribute-dialog-description" color="dark-gray">
          {t("ContributeDialog_desc")}
          <p>
            {t("ContributeDialog_forthis")}&nbsp;
            <Link
              sx={{ fontWeight: 800 }}
              underline="hover"
              onClick={(e) => {
                e.preventDefault();
                openExternalLink("https://github.com/fuzue/seasonalfood");
              }}
            >
              {t("ContributeDialog_githubPage")}
            </Link>
          </p>
        </DialogContentText>
      </DialogContent>
    </>
  );
}
