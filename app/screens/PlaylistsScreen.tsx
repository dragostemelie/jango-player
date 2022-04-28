import React from "react";

import Header from "components/Header";
import Playlists from "components/Playlists";

export default function PlaylistsScreen() {
  return (
    <>
      <Header title="Playlists" />
      <Playlists />
    </>
  );
}
