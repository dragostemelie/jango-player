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
  title: string;
}

export default function PlaylistCard({
  isSelected,
  onSelect,
  title,
}: IPlaylistCard) {
  return (
    <TouchableNativeFeedback onPress={onSelect}>
      <View style={[styles.container, isSelected && styles.selected]}>
        <View style={styles.contextWrapper}>
          <View style={styles.image}>
            <MaterialCommunityIcons
              name="playlist-music"
              color={colors.secondary}
              size={36}
            />
          </View>
          <View style={styles.textWrapper}>
            <AppText style={styles.text}>{title}</AppText>
          </View>
          {isSelected && (
            <View style={styles.chevronWrapper}>
              <MaterialCommunityIcons
                name="chevron-right"
                color={colors.secondary}
                size={36}
              />
            </View>
          )}
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
    borderBottomWidth: 1,
    borderColor: colors.selectedGrey,
    flexDirection: "row",
    height: 80,
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
    fontSize: 18,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
});
