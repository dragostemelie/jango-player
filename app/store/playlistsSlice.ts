import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { PlaylistItem, Song } from "types";

const initialPlaylistState: PlaylistItem[] = [
  { id: 263448187, name: "Today's Top 100", playlist: [] },
  { id: 312436636, name: "Hot Rock Hits", playlist: [] },
  { id: 400529601, name: "Best of 2010's", playlist: [] },
  { id: 253933285, name: "Hits from the 80s", playlist: [] },
  { id: 399063352, name: "Top Pop Hits", playlist: [] },
  { id: 349284103, name: "Party Pop", playlist: [] },
  { id: 291306600, name: "Hits from the 2000's", playlist: [] },
  { id: 400861993, name: "Pop Rock of The 90's", playlist: [] },
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
      if (playlistIndex !== -1) {
        const songs = _.uniqBy(
          [...state[playlistIndex].playlist, ...action.payload.songs],
          "song_id"
        );
        state[playlistIndex].playlist = songs;
      }
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
