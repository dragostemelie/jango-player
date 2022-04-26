import React, { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import TrackPlayer, {
  Capability,
  Event,
  State,
  useProgress,
} from "react-native-track-player";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppText from "./Text";
import { colors } from "config/styles";
import { playSong } from "store/playerSlice";
import { selectFavorites, selectPlayer, selectPlaylist } from "store/store";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(true);

  const player = useAppSelector(selectPlayer);
  const playlist =
    player.playlistId === 100
      ? useAppSelector(selectFavorites)
      : useAppSelector(selectPlaylist);
  const dispatch = useAppDispatch();
  const { position, duration } = useProgress();

  const handlePlayPause = () => {
    if (isPlaying) {
      TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    let nextSongIndex = player.currentSong;
    if (player.currentSong > 0) nextSongIndex -= 1;
    else nextSongIndex = player.playlist.length - 1;
    if (nextSongIndex !== player.currentSong) {
      dispatch(playSong(nextSongIndex));
    }
  };

  const handleNext = () => {
    let nextSongIndex = player.currentSong;
    if (player.playlist.length - 1 > player.currentSong) nextSongIndex += 1;
    else nextSongIndex = 0;
    if (nextSongIndex !== player.currentSong) {
      dispatch(playSong(nextSongIndex));
    }
  };

  const handleSeek = (value: number) => {
    TrackPlayer.seekTo(value);
  };

  const initializePlayer = async () => {
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
      await TrackPlayer.reset();

      TrackPlayer.addEventListener(
        Event.PlaybackTrackChanged,
        (event: { track: number; nextTrack: number | undefined }) => {
          if (event.nextTrack && event.nextTrack === event.track) {
            dispatch(playSong(event.nextTrack));
          }
        }
      );
    } catch (e) {
      console.log(e);
      // to-do handle error
    }
  };

  const playNextSong = async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    if (player.currentSong !== trackIndex) {
      await TrackPlayer.skip(player.currentSong);
    }
    const state = await TrackPlayer.getState();
    if (state !== State.Playing) {
      setIsPlaying(true);
      TrackPlayer.play();
    }
  };

  const startPlayer = async () => {
    await initializePlayer();
    if (player.playlistId === 100) {
      await updatePlaylist();
    } else {
      await updateFavorites();
    }
  };

  const stopPlayer = async () => {
    await TrackPlayer.destroy();
    dispatch(playSong(-1));
  };

  const updateFavorites = async () => {
    const songs = playlist.map((song) => ({
      id: song.song_id,
      url: "http:" + song.url,
      title: song.song,
      artist: song.artist,
      artwork: song.album_art,
    }));
    await TrackPlayer.reset();
    await TrackPlayer.add(songs, undefined);
    dispatch(playSong(-1));
  };

  const updatePlaylist = async () => {
    const songsCount = (await TrackPlayer.getQueue()).length;
    const songs = playlist
      .slice(songsCount) //only add last songs from playlist
      .map((song) => ({
        id: song.song_id,
        url: "http:" + song.url,
        title: song.song,
        artist: song.artist,
        artwork: song.album_art,
      }));
    await TrackPlayer.add(songs, undefined);
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
    startPlayer();
    return () => {
      stopPlayer();
    };
  }, []);

  useEffect(() => {
    if (player.currentSong !== -1) playNextSong();
  }, [player.currentSong]);

  useEffect(() => {
    if (player.playlistId !== 100) {
      updatePlaylist();
    } else {
      updateFavorites();
    }
  }, [playlist]);

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
