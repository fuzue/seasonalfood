
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SelectLang() {
  const { t, i18n } = useTranslation();


  const langs = {
    en: { nativeName: "English" },
    it: { nativeName: "Italiano" },
  } as { [key: string]: { nativeName: string } };

  return (
    <FormControl sx={{ minWidth: "100%" }} size="small">
      <InputLabel id="demo-select-small-label">{t("SelectLang_Text")}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={i18n.resolvedLanguage}
        label="Language"
        onChange={(event: SelectChangeEvent) =>
          i18n.changeLanguage(event.target.value)
        }
      >
        {Object.keys(langs).map((lng) => (
          <MenuItem
            key={lng}
            selected={i18n.resolvedLanguage === lng}
            value={lng}
          >
            {langs[lng].nativeName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
