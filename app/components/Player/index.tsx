import React, { useState, useEffect } from "react";
import TrackPlayer, {
  Capability,
  Event,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { colors } from "config/styles";
import { RootStackParamList } from "navigation/PlaylistNavigation";
import {
  playSong,
  setCompact,
  setNextPlaylist,
  setPlaylist,
} from "store/playerSlice";
import { PlaylistItem, Song } from "types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  selectFavorites,
  selectNextPlaylist,
  selectPlayer,
  selectPlaylist,
  selectPlaylists,
  store,
} from "store/store";
import { toggleFavorite } from "store/favoritesSlice";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import SongInfo from "./SongInfo";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Playlist">;

const events = [Event.PlaybackQueueEnded];

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(true);

  const navigation = useNavigation<NavigationProp>();
  const player = useAppSelector(selectPlayer);
  const favorites = useAppSelector(selectFavorites);
  const playlist =
    player.currentPlaylistId === 100
      ? favorites
      : useAppSelector(selectPlaylist);
  const playlists = useAppSelector(selectPlaylists);
  const dispatch = useAppDispatch();
  const { position, duration } = useProgress();

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackQueueEnded) {
      handlePlaybackQueueEnded();
    }
  });

  // CONTROLS

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
      const currentPlaylist = state.player.currentPlaylistId;
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

  // TRACKPLAYER

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

  //SONG INFO

  const isFavorite = () => {
    return favorites.some(
      (song) => song.song_id === playlist[player.currentSong].song_id
    );
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(playlist[player.currentSong]));
  };

  const handleSongPress = () => {
    if (player.compact) {
      const currentPlaylist = playlists.find(
        (list) => list.id === player.currentPlaylistId
      ) as PlaylistItem;
      dispatch(setNextPlaylist(currentPlaylist));
      dispatch(setCompact(false));
      navigation.navigate("Playlist");
    }
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
  }, [player.currentSong, player.currentPlaylistId]);

  return (
    <>
      {player.currentSong !== -1 && (
        <View style={styles.container}>
          {/* SONG INFO */}
          <SongInfo
            compact={player.compact}
            favorite={isFavorite()}
            playing={isPlaying}
            song={playlist[player.currentSong]}
            onPress={handleSongPress}
            onPlayPause={handlePlayPause}
            onToggleFavorite={handleToggleFavorite}
          />
          {/* PROGRESS BAR */}
          <ProgressBar
            compact={player.compact}
            duration={duration}
            position={position}
            onSeek={handleSeek}
          />
          {/* CONTROLS */}
          <Controls
            compact={player.compact}
            playing={isPlaying}
            onNext={handleNext}
            onPlayPause={handlePlayPause}
            onPrev={handlePrev}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.activeBlack,
    borderColor: colors.selectedGrey,
    borderTopWidth: 1,
    bottom: 0,
    paddingBottom: 8,
    paddingTop: 8,
    width: "100%",
  },
});
