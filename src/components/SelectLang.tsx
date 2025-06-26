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
    pt: { nativeName: "Português(BR)" },
  } as { [key: string]: { nativeName: string } };

  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel id="select-lang-label">{t("SelectLang_Text")}</InputLabel>
      <Select
        labelId="select-lang-label"
        id="select-lang"
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
