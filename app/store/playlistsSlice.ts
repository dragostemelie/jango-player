import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlaylistItem, Song } from "types";

const initialPlaylistState: PlaylistItem[] = [
  { id: 399063352, name: "Top Pop Hits", playlist: [] },
  { id: 276755202, name: "Fresh Finds", playlist: [] },
  { id: 378000581, name: "R\u0026B Hits", playlist: [] },
  { id: 263448190, name: "Hot Country", playlist: [] },
  { id: 361346219, name: "Today's Top 100", playlist: [] },
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
    },
    clearPlaylist: (state, action: PayloadAction<{ id: number }>) => {
      const playlistIndex = state.findIndex(
        (playlist) => playlist.id === action.payload.id
      );
      state[playlistIndex].playlist = [];
    },
  },
});

export const { updatePlaylist, clearPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
