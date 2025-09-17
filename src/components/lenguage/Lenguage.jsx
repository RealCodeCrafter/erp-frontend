import { memo, useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { FlagIcon } from "react-flag-kit";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "uz", name: "O'zbek", flag: "UZ" },
  { code: "ru", name: "Русский", flag: "RU" },
];

const Language = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code); // Tilni o'zgartirish
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FlagIcon code={selectedLanguage.flag} size={24} />
      </IconButton>
      <Menu
        style={{ zIndex: "9999" }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            selected={language.code === selectedLanguage.code}
            onClick={() => handleLanguageChange(language)}
          >
            <FlagIcon
              code={language.flag}
              size={24}
              style={{ marginRight: "10px" }}
            />
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default memo(Language);
