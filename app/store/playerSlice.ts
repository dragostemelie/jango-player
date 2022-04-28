import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlaylistItem } from "types";

const initialPlayerState = {
  currentSong: -1,
  currentPlaylistId: 0,
  nextPlaylistId: 0,
  nextPlaylistName: "",
  compact: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialPlayerState,
  reducers: {
    playSong: (state, action: PayloadAction<number>) => {
      state.currentSong = action.payload;
      return state;
    },
    setPlaylist: (state, action: PayloadAction<PlaylistItem>) => {
      state.currentPlaylistId = action.payload.id;
      state.nextPlaylistName = action.payload.name;
      return state;
    },
    setNextPlaylist: (state, action: PayloadAction<PlaylistItem>) => {
      state.nextPlaylistId = action.payload.id;
      state.nextPlaylistName = action.payload.name;
      return state;
    },
    setCompact: (state, action: PayloadAction<boolean>) => {
      state.compact = action.payload;
      return state;
    },
    setFavorites: (state) => {
      state.nextPlaylistId = 100;
      state.nextPlaylistName = "My favorite songs";
      return state;
    },
  },
});

export const {
  playSong,
  setFavorites,
  setCompact,
  setPlaylist,
  setNextPlaylist,
} = playerSlice.actions;

export default playerSlice.reducer;
