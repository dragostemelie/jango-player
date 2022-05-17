import React from "react";
import {
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "config/styles";

interface IAppScreen extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

export default function AppScreen({ children, style, ...rest }: IAppScreen) {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      <StatusBar
        animated={true}
        backgroundColor={colors.activeBlack}
        barStyle="light-content"
        hidden={false}
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlack,
  },
});
