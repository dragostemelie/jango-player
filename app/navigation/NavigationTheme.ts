import { DefaultTheme } from "@react-navigation/native";
import { colors } from "config/styles";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.activeBlack,
  },
};

export default theme;
