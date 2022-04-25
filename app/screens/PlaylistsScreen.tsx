import React from "react";

import AppScreen from "components/Screen";
import Header from "components/Header";
import Playlists from "components/Playlists";
import { selectPlayer } from "store/store";
import { useAppSelector } from "store/hooks";

export default function PlaylistsScreen() {
  const player = useAppSelector(selectPlayer);
  return (
    <AppScreen>
      <Header title="Playlists" />
      <Playlists />
    </AppScreen>
  );
}
