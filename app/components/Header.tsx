import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";

import AppText from "./Text";
import { colors } from "config/styles";

interface IHeader {
  onBackPress?: (event: GestureResponderEvent) => void;
  subtitle?: string;
  title: string;
}

export default function Header({ onBackPress, subtitle, title }: IHeader) {
  return (
    <View style={styles.container}>
      {subtitle && (
        <TouchableWithoutFeedback onPress={onBackPress}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={colors.primary}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <View
        style={[
          styles.textWrapper,
          ,
          { alignItems: subtitle ? "flex-start" : "center" },
        ]}
      >
        <AppText style={styles.title}>{title}</AppText>
        {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.activeBlack,
    borderColor: colors.selectedGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
  iconWrapper: {
    justifyContent: "center",
    padding: 10,
  },
  subtitle: {
    color: colors.distinctYellow,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
  },
});
