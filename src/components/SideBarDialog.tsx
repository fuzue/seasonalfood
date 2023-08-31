import { Dialog, DialogActions, Button } from "@mui/material";
import AboutDialog from "./AboutDialog";
import ContactDialog from "./ContactDialog";
import ContributeDialog from "./ContributeDialog";
import { useTranslation } from "react-i18next";

//dialog box that opens with each element clicked

export default function SideBarDialog(props: {
  open: boolean;
  dialogType: string;
  handleClose: () => void;
}) {
  const { t } = useTranslation();
  const renderDialog = (anchor: string) => {
    if (anchor === "about") {
      return <AboutDialog />;
    } else if (anchor === "contribute") {
      return <ContributeDialog />;
    } else if (anchor === "contact") {
      return <ContactDialog />;
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      {renderDialog(props.dialogType)}
      <DialogActions>
        <Button variant="outlined" onClick={props.handleClose} autoFocus>
          {t("SideBarDialog_close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
