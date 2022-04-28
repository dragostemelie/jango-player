import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "navigation/PlaylistNavigation";
import { selectPlayer } from "store/store";
import { setCompact } from "store/playerSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Header from "components/Header";
import Playlist from "components/Playlist";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Playlists"
>;

export default function PlaylistScreen() {
  const player = useAppSelector(selectPlayer);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const handleBackPress = () => {
    dispatch(setCompact(true));
    navigation.navigate("Playlists");
  };

  return (
    <>
      <Header
        title="Playlist"
        subtitle={player.nextPlaylistName}
        onBackPress={handleBackPress}
      />
      <Playlist />
    </>
  );
}
