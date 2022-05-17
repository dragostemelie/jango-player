import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "navigation/PlaylistNavigation";
import { selectPlayer, selectPrevPlaylist } from "store/store";
import { setCompact, setNextPlaylist } from "store/playerSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Header from "components/Header";
import PlaylistArtist from "components/PlaylistArtist";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Playlist">;

export default function ArtistScreen() {
  const player = useAppSelector(selectPlayer);
  const prevPlaylist = useAppSelector(selectPrevPlaylist);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const handleBackPress = () => {
    dispatch(setCompact(true));
    dispatch(setNextPlaylist(prevPlaylist));
    navigation.navigate("Playlist");
  };

  return (
    <>
      <Header
        title={player.nextPlaylistName}
        subtitle={"Songs"}
        onBackPress={handleBackPress}
      />
      <PlaylistArtist />
    </>
  );
}
