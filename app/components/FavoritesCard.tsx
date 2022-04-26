import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./Text";
import { colors } from "config/styles";

interface IPlaylistCard {
  isSelected?: boolean;
  onSelect?: (event: GestureResponderEvent) => void;
}

export default function FavoritesCard({ isSelected, onSelect }: IPlaylistCard) {
  return (
    <TouchableNativeFeedback onPress={onSelect}>
      <View style={[styles.container, isSelected && styles.selected]}>
        <View style={styles.contextWrapper}>
          <View style={styles.image}>
            <MaterialCommunityIcons
              name="heart"
              color={colors.accentYellow}
              size={32}
            />
          </View>
          <View style={styles.textWrapper}>
            <AppText style={styles.text}>My favorite songs</AppText>
          </View>
          <View style={styles.chevronWrapper}>
            <MaterialCommunityIcons
              name="chevron-right"
              color={colors.secondary}
              size={36}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  chevronWrapper: {
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.activeBlack,
    borderTopWidth: 1,
    borderColor: colors.selectedGrey,
    flexDirection: "row",
    height: 90,
    paddingHorizontal: 20,
    width: "100%",
  },
  contextWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.selectedGrey,
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    overflow: "hidden",
    width: 60,
  },
  selected: {
    backgroundColor: colors.selectedGrey,
  },
  text: {
    color: colors.distinctYellow,
    fontSize: 18,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
});
