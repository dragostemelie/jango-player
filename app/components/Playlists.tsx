import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PlaylistItem } from "types";
import { RootStackParamList } from "navigation/PlaylistNavigation";
import { selectFavorites, selectPlayer, selectPlaylists } from "store/store";
import { setCompact, setNextPlaylist } from "store/playerSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import PlaylistCard from "./PlaylistCard";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Playlist">;

export default function Playlists() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const player = useAppSelector(selectPlayer);
  const playlists = useAppSelector(selectPlaylists);
  const favorites = useAppSelector(selectFavorites);

  const handleSelectPlaylist = (playlist: PlaylistItem) => {
    if (playlist.id === player.currentPlaylistId) {
      dispatch(setCompact(false));
    }
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
