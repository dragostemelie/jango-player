import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlaylistItem } from "types";
import { RootStackParamList } from "navigation/PlaylistNavigation";
import { selectFavorites, selectPlayer, selectPlaylists } from "store/store";
import { setFavorites, setPlaylist } from "store/playerSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import PlaylistCard from "./PlaylistCard";
import FavoritesCard from "./FavoritesCard";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Playlist">;

export default function Playlists() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const player = useAppSelector(selectPlayer);
  const playlists = useAppSelector(selectPlaylists);
  const favorites = useAppSelector(selectFavorites);

  const handleSelectPlaylist = (playlist: PlaylistItem) => {
    dispatch(setPlaylist(playlist));
    navigation.navigate("Playlist");
  };

  const handleSelectFavorites = () => {
    dispatch(setFavorites());
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
            isSelected={item.id === player.playlistId}
            onSelect={() => handleSelectPlaylist(item)}
          />
        )}
      />
      {favorites.length !== 0 && (
        <FavoritesCard onSelect={handleSelectFavorites} />
      )}
    </>
  );
}
