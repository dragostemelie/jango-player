import { configureStore } from "@reduxjs/toolkit";

import player from "store/playerSlice";
import playlists from "store/playlistsSlice";

const store = configureStore({
  reducer: {
    player,
    playlists,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectPlayer = (state: RootState) => {
  return state.player;
};
export const selectPlaylist = (state: RootState) => {
  return (
    state.playlists.find((list) => list.id === state.player.playlistId)
      ?.playlist || []
  );
};
export const selectPlaylists = (state: RootState) => {
  return state.playlists;
};

export default store;
