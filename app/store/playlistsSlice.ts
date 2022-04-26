import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlaylistItem, Song } from "types";

const initialPlaylistState: PlaylistItem[] = [
  { id: 263448187, name: "Today's Top 100", playlist: [] },
  { id: 400389939, name: "Hot Rock Hits", playlist: [] },
  { id: 168397373, name: "Best of 2010's", playlist: [] },
  { id: 113283831, name: "Hits from the 80s", playlist: [] },
  { id: 202741503, name: "Top Pop Hits", playlist: [] },
  { id: 267466353, name: "Party Pop", playlist: [] },
  { id: 113262396, name: "Hits from the 2000's", playlist: [] },
  { id: 113275818, name: "Pop Rock of The 90's", playlist: [] },
];

const playlistSlice = createSlice({
  name: "playlists",
  initialState: initialPlaylistState,
  reducers: {
    updatePlaylist: (
      state,
      action: PayloadAction<{ id: number; songs: Song[] }>
    ) => {
      const playlistIndex = state.findIndex(
        (playlist) => playlist.id === action.payload.id
      );
      state[playlistIndex].playlist = [
        ...state[playlistIndex].playlist,
        ...action.payload.songs,
      ];
      return state;
    },
    clearPlaylist: (state, action: PayloadAction<{ id: number }>) => {
      const playlistIndex = state.findIndex(
        (playlist) => playlist.id === action.payload.id
      );
      state[playlistIndex].playlist = [];
      return state;
    },
  },
});

export const { updatePlaylist, clearPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
