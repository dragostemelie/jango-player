import React, { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import TrackPlayer, {
  Capability,
  Event,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors } from "config/styles";
import { playSong } from "store/playerSlice";
import { Song } from "types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import AppText from "./Text";
import store, {
  selectFavorites,
  selectPlayer,
  selectPlaylist,
} from "store/store";

const events = [Event.PlaybackQueueEnded];

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(true);

  const player = useAppSelector(selectPlayer);
  const playlist =
    player.playlistId === 100
      ? useAppSelector(selectFavorites)
      : useAppSelector(selectPlaylist);
  const dispatch = useAppDispatch();
  const { position, duration } = useProgress();

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackQueueEnded) {
      handlePlaybackQueueEnded();
    }
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const handlePrev = async () => {
    if (player.currentSong > 0) {
      dispatch(playSong(player.currentSong - 1));
    }
  };

  const handleNext = async () => {
    if (player.currentSong < playlist.length - 1)
      dispatch(playSong(player.currentSong + 1));
  };

  const handleSeek = (value: number) => {
    TrackPlayer.seekTo(value);
  };

  const handlePlaybackQueueEnded = () => {
    const state = store.getState();
    if (state.player.currentSong !== -1) {
      const currentSong = state.player.currentSong;
      const currentPlaylist = state.player.playlistId;
      const playlist = state.playlists.find(
        (list) => list.id === currentPlaylist
      )?.playlist as Song[];

      if (currentSong < playlist?.length - 1) {
        dispatch(playSong(currentSong + 1));
      } else {
        dispatch(playSong(0));
      }
    }
  };

  const initPlayer = async () => {
    try {
      TrackPlayer.updateOptions({
        stopWithApp: true, // false=> music continues in background even when app is closed
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
      });

      await TrackPlayer.setupPlayer();
    } catch (e) {
      console.log(e);
      // to-do handle error
    }
  };

  const destroyPlayer = async () => {
    await TrackPlayer.destroy();
    dispatch(playSong(-1));
  };

  const playNextSong = async () => {
    const nextSong = {
      id: playlist[player.currentSong].song_id,
      url: "http:" + playlist[player.currentSong].url,
      title: playlist[player.currentSong].song,
      artist: playlist[player.currentSong].artist,
      artwork: playlist[player.currentSong].album_art,
    };

    await TrackPlayer.reset();
    await TrackPlayer.add(nextSong);
    await TrackPlayer.play();
  };

  const secondsToHHMMSS = (seconds: number | string) => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : "";
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "00:";
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : "00";
    return `${hrs}${mins}${scnds}`;
  };

  useEffect(() => {
    initPlayer();
    return () => {
      destroyPlayer();
    };
  }, []);

  useEffect(() => {
    if (player.currentSong !== -1) {
      playNextSong();
    } else {
      TrackPlayer.stop();
    }
  }, [player.currentSong]);

  return (
    <>
      {player.currentSong !== -1 && (
        <View style={styles.container}>
          {/* PROGRESS BAR */}
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={colors.accentYellow}
            maximumTrackTintColor={colors.linerBlack}
            thumbTintColor={colors.accentYellow}
            value={position}
            onSlidingComplete={handleSeek}
          />
          <View style={styles.timer}>
            <AppText style={styles.startTime}>
              {secondsToHHMMSS(position)}
            </AppText>
            <AppText style={styles.endTime}>
              {secondsToHHMMSS(duration)}
            </AppText>
          </View>
          {/* CONTROLS */}
          <View style={styles.controls}>
            <TouchableOpacity onPress={handlePrev}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                  name="rewind-outline"
                  color={colors.secondary}
                  size={36}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              <View style={styles.play}>
                <MaterialCommunityIcons
                  name={isPlaying ? "pause" : "play"}
                  color={colors.accentYellow}
                  size={40}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                  name="fast-forward-outline"
                  color={colors.secondary}
                  size={36}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.selectedGrey,
    borderTopWidth: 1,
    backgroundColor: colors.activeBlack,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 18,
    width: "100%",
  },
  progressBar: {
    width: "100%",
  },
  timer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    width: "100%",
  },
  startTime: {
    fontSize: 14,
  },
  endTime: {
    color: colors.secondary,
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    width: "100%",
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
  iconWrapper: {
    alignItems: "center",
    height: 72,
    justifyContent: "center",
    width: 72,
  },
});
