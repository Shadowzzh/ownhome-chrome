import { Switch } from "@mui/material";
import { useThemeStore } from "../store/theme";
import { Brightness4Outlined, ModeNightOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { STORAGE, storage } from "../../storage";

export const SwitchThemeMode = () => {
  const { setThemeMode, themeOptions } = useThemeStore((state) => state);
  const value = themeOptions.palette?.mode === "dark" ? false : true;

  const onChange = () => {
    if (themeOptions.palette?.mode === "dark") {
      setThemeMode("light");
      storage.set({ [STORAGE.THEME]: "light" });
    } else {
      setThemeMode("dark");
      storage.set({ [STORAGE.THEME]: "dark" });
    }
  };

  useEffect(() => {
    const init = async () => {
      const storageData = await storage.get(STORAGE.THEME);

      if (storageData.theme !== undefined) {
        setThemeMode(storageData.theme);
      }
    };

    init();
  }, [setThemeMode]);

  return (
    <Switch
      color="default"
      checked={value}
      icon={<ModeNightOutlined />}
      checkedIcon={<Brightness4Outlined />}
      onChange={onChange}
    />
  );
};
