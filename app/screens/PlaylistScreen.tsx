import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "navigation/PlaylistNavigation";
import { selectPlayer } from "store/store";
import { useAppSelector } from "store/hooks";
import AppScreen from "components/Screen";
import Header from "components/Header";
import Player from "components/Player";
import Playlist from "components/Playlist";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Playlists"
>;

export default function PlaylistScreen() {
  const player = useAppSelector(selectPlayer);
  const navigation = useNavigation<NavigationProp>();

  return (
    <AppScreen>
      <Header
        title="Playlist"
        subtitle={player.playlist}
        onBackPress={() => navigation.navigate("Playlists")}
      />
      <Playlist />
      <Player />
    </AppScreen>
  );
}
