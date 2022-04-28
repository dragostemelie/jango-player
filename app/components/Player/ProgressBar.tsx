import React from "react";
import Slider from "@react-native-community/slider";
import { View, StyleSheet } from "react-native";

import AppText from "components/Text";
import { colors } from "config/styles";

interface IProgressBar {
  compact: boolean;
  duration: number;
  position: number;
  onSeek: (value: number) => void;
}

const secondsToHHMMSS = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : "";
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "00:";
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : "00";
  return `${hrs}${mins}${scnds}`;
};

export default function ProgressBar({
  compact,
  duration,
  position,
  onSeek,
}: IProgressBar) {
  return (
    <View style={!compact && styles.container}>
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor={colors.accentYellow}
        maximumTrackTintColor={colors.linerBlack}
        thumbTintColor={compact ? undefined : colors.accentYellow}
        value={position}
        onSlidingComplete={onSeek}
      />
      {!compact && (
        <View style={styles.timer}>
          <AppText style={styles.startTime}>
            {secondsToHHMMSS(position)}
          </AppText>
          <AppText style={styles.endTime}>{secondsToHHMMSS(duration)}</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  progressBar: {
    width: "100%",
  },
  timer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    width: "100%",
  },
  startTime: {
    fontSize: 14,
  },
  endTime: {
    color: colors.secondary,
    fontSize: 14,
  },
});
