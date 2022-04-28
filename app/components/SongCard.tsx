import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./Text";
import { colors } from "config/styles";

interface ISongCard {
  image?: string;
  isFavorite?: boolean;
  isSelected?: boolean;
  onSelect?: (event: GestureResponderEvent) => void;
  onToggleFavorite?: (event: GestureResponderEvent) => void;
  subtitle: string;
  title: string;
}

export default function SongCard({
  image,
  isFavorite,
  isSelected,
  onSelect,
  onToggleFavorite,
  subtitle,
  title,
}: ISongCard) {
  return (
    <View style={[styles.container, isSelected && styles.selected]}>
      <TouchableNativeFeedback onPress={onSelect}>
        <View style={styles.contextWrapper}>
          <View style={styles.image}>
            {image ? (
              <Image
                source={{
                  uri: image,
                  width: 60,
                  height: 60,
                }}
                resizeMode="cover"
                width={60}
                height={60}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-music"
                color={colors.secondary}
                size={36}
              />
            )}
          </View>
          <View style={styles.textWrapper}>
            <AppText>{title}</AppText>
            <AppText style={styles.subtitle}>{subtitle}</AppText>
          </View>
          <TouchableWithoutFeedback onPress={onToggleFavorite}>
            <View style={styles.heartWrapper}>
              <MaterialCommunityIcons
                name={isFavorite ? "heart" : "heart-outline"}
                color={colors.distinctYellow}
                size={24}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.selectedGrey,
    flexDirection: "row",
    width: "100%",
  },
  contextWrapper: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: 90,
    paddingHorizontal: 20,
  },
  heartWrapper: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
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
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: 6,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
