import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PlaylistItem } from "types";
import { RootStackParamList } from "navigation/PlaylistNavigation";
import { selectPlayer, selectPlaylists } from "store/store";
import {
  setCompact,
  setNextPlaylist,
  setPrevPlaylist,
} from "store/playerSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import PlaylistCard from "./PlaylistCard";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Playlist">;

export default function Playlists() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const player = useAppSelector(selectPlayer);
  const playlists = useAppSelector(selectPlaylists);

  const handleSelectPlaylist = (playlist: PlaylistItem) => {
    if (playlist.id === player.currentPlaylistId) {
      dispatch(setCompact(false));
    }
    dispatch(setPrevPlaylist(playlist.id));
    dispatch(setNextPlaylist(playlist));
    navigation.navigate("Playlist");
  };

  return (
    <>
      <FlatList
        data={playlists}
        getItemLayout={(_, index) => ({
          length: 90,
          offset: 90 * index,
          index,
        })}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <PlaylistCard
            key={index}
            title={item.name}
            isSelected={item.id === player.currentPlaylistId}
            onSelect={() => handleSelectPlaylist(item)}
          />
        )}
      />
    </>
  );
}
