import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "components/Text";
import { colors } from "config/styles";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Song } from "types";

interface ISongInfo {
  compact: boolean;
  favorite: boolean;
  playing: boolean;
  onPress?: () => void;
  onPlayPause?: () => void;
  onToggleFavorite?: () => void;
  song?: Song;
}

export default function SongInfo({
  compact,
  playing,
  favorite,
  onPress,
  onPlayPause,
  onToggleFavorite,
  song,
}: ISongInfo) {
  return (
    <>
      {song && (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <View style={styles.image}>
              {song.album_art ? (
                <Image
                  source={{
                    uri: song.album_art,
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
              <AppText style={styles.title}>{song.song}</AppText>
              <AppText style={styles.subtitle}>{song.artist}</AppText>
            </View>
            <TouchableWithoutFeedback onPress={onToggleFavorite}>
              <View style={styles.heartWrapper}>
                {compact ? (
                  <TouchableWithoutFeedback onPress={onPlayPause}>
                    <MaterialCommunityIcons
                      name={playing ? "pause" : "play"}
                      color={colors.primary}
                      size={32}
                    />
                  </TouchableWithoutFeedback>
                ) : (
                  <MaterialCommunityIcons
                    name={favorite ? "heart" : "heart-outline"}
                    color={colors.distinctYellow}
                    size={24}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 18,
    paddingRight: 8,
    width: "100%",
  },
  contextWrapper: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  heartWrapper: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: "auto",
  },
  image: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.selectedGrey,
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    overflow: "hidden",
    width: 48,
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "normal",
  },
  textWrapper: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
});
