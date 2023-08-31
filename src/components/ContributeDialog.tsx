import { DialogTitle, DialogContent, DialogContentText, Link }
  from "@mui/material";
import { useTranslation } from "react-i18next";

//dialog box that opens with each element clicked
export default function ContributeDialog() {
  const { t } = useTranslation();
  return (
    <>
      <DialogTitle id="contribute-dialog-title" >
        {t("ContributeDialog_title")}
      </DialogTitle>
      <DialogContent >
        <DialogContentText id="contribute-dialog-description">
          {t("ContributeDialog_desc")}
          <p>{t("ContributeDialog_forthis")}&nbsp;
            <Link underline="hover" href="https://github.com/fuzue/seasonfood" target="_blank">
              {t("ContributeDialog_githubPage")}
            </Link>
          </p>
        </DialogContentText>
      </DialogContent>
    </>


  )
}
