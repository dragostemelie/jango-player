import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlaylistItem, Song } from "types";

const initialPlayerState = {
  currentSong: -1,
  playlistId: 0,
  playlist: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialPlayerState,
  reducers: {
    playSong: (state, action: PayloadAction<number>) => {
      state.currentSong = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<PlaylistItem>) => {
      state.playlistId = action.payload.id;
      state.playlist = action.payload.name;
    },
  },
});

export const { playSong, setPlaylist } = playerSlice.actions;

export default playerSlice.reducer;
