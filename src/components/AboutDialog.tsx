
import { DialogTitle, DialogContent, DialogContentText, Typography, Link }
  from "@mui/material"
import { useTranslation } from "react-i18next"

//dialog box that opens with each element clicked
export default function AboutDialog() {
  const { t } = useTranslation();
  return (
    <>
      <DialogTitle id="about-dialog-title">
        {t("AboutDialog_title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="about-dialog-description" color="dark-gray">
          <p>{t("AboutDialog_desc1")}</p>
          <p>{t("AboutDialog_desc2")}</p>

          
          <Typography sx={{fontWeight: 600 }}>
          {t("AboutDialog_ItalyDisclaimer")}
          </Typography>
          <Typography sx={{fontWeight: 800, mt: 3}}>
            {t("AboutDialog_aboutus")} <Link underline="hover" sx={{ color: "inherit"}} href="https://fuzue.tech" target="_blank">fuzue.tech</Link> 
            <br /> 
            {t("AboutDialog_aboutapp")} <Link underline="hover" sx={{ color: "inherit"}} href="https://seasonalfood.fuzue.tech/" target="_blank" > here</Link> 
          </Typography>
        </DialogContentText>
      </DialogContent>
    </>


  )
}
