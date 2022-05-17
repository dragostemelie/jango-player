import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { PlaylistItem } from "types";

const initialArtistsState: PlaylistItem[] = [];

const artistsSlice = createSlice({
  name: "artists",
  initialState: initialArtistsState,
  reducers: {
    updateArtistPlaylist: (state, action: PayloadAction<PlaylistItem>) => {
      const playlistIndex = state.findIndex(
        (playlist) => playlist.id === action.payload.id
      );
      if (playlistIndex !== -1) {
        const songs = _.uniqBy(
          [...state[playlistIndex].playlist, ...action.payload.playlist],
          "song_id"
        );
        state[playlistIndex].playlist = songs;
      } else {
        state.push({
          id: action.payload.id,
          name: action.payload.name,
          playlist: action.payload.playlist,
        });
      }
      return state;
    },
  },
});

export const { updateArtistPlaylist } = artistsSlice.actions;

export default artistsSlice.reducer;
