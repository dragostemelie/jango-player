import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Song } from "types";

const initialFavoriteState: Song[] = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavoriteState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Song>) => {
      const songExists = state.some(
        (item) => item.song_id === action.payload.song_id
      );
      if (songExists) {
        state = state.filter((item) => item.song_id !== action.payload.song_id);
      } else {
        state.push(action.payload);
      }
      return state;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
