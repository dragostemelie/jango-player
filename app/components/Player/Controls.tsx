import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "config/styles";

interface IControls {
  compact: boolean;
  playing: boolean;
  onNext: () => void;
  onPlayPause: () => void;
  onPrev: () => void;
}

export default function Controls({
  playing,
  compact,
  onNext,
  onPlayPause,
  onPrev,
}: IControls) {
  return (
    <>
      {!compact && (
        <View style={styles.controls}>
          <TouchableOpacity onPress={onPrev}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="rewind-outline"
                color={colors.secondary}
                size={36}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPause}>
            <View style={styles.play}>
              <MaterialCommunityIcons
                name={playing ? "pause" : "play"}
                color={colors.accentYellow}
                size={40}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="fast-forward-outline"
                color={colors.secondary}
                size={36}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    paddingBottom: 8,
    justifyContent: "space-around",
    width: "100%",
  },
  iconWrapper: {
    alignItems: "center",
    height: 72,
    justifyContent: "center",
    width: 72,
  },
  play: {
    alignItems: "center",
    backgroundColor: colors.highlightBlack,
    borderColor: colors.linerBlack,
    borderRadius: 36,
    borderWidth: 1,
    height: 72,
    justifyContent: "center",
    width: 72,
  },
});
