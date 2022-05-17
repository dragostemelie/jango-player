import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import player from "store/playerSlice";
import playlists from "store/playlistsSlice";
import favorites from "store/favoritesSlice";
import artists from "store/artistsSlice";
import { PlaylistItem, Song } from "types";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["playlists", "player", "artists"],
};

const rootReducer = combineReducers({
  player,
  playlists,
  favorites,
  artists,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectPlayer = (state: RootState) => {
  return state.player;
};
export const selectPlaylist = (state: RootState) => {
  if (state.player.currentPlaylistId === 100) return state.favorites;
  return (
    state.playlists.find((list) => list.id === state.player.currentPlaylistId)
      ?.playlist || []
  );
};
export const selectNextPlaylist = (state: RootState) => {
  //favorites
  if (state.player.nextPlaylistId === 100)
    return {
      id: 100,
      name: "My favorite songs",
      playlist: state.favorites,
    } as PlaylistItem;

  //normal playlist
  let playlist = state.playlists.find(
    (list) => list.id === state.player.nextPlaylistId
  ) as PlaylistItem;
  if (playlist !== undefined) {
    return playlist;
  }

  //artist playlist
  playlist = state.artists.find(
    (list) => list.id === state.player.nextPlaylistId
  ) as PlaylistItem;
  if (playlist !== undefined) {
    return playlist;
  }

  //default empty
  return {
    id: 0,
    name: "No playlist",
    playlist: [],
  };
};
export const selectPlaylists = (state: RootState) => {
  return state.playlists;
};
export const selectFavorites = (state: RootState) => {
  return state.favorites;
};
export const selectArtists = (state: RootState) => {
  return state.artists;
};

export const selectCurrentPlaylistSongs = (state: RootState) => {
  //favorites
  if (state.player.currentPlaylistId === 100) {
    return state.favorites;
  }

  //normal playlist
  let playlist = state.playlists.find(
    (playlist) => playlist.id === state.player.currentPlaylistId
  )?.playlist;
  if (playlist !== undefined) {
    return playlist;
  }

  //artist playlist
  playlist = state.artists.find(
    (playlist) => playlist.id === state.player.currentPlaylistId
  )?.playlist;
  if (playlist !== undefined) {
    return playlist;
  }

  //default empty
  return [] as Song[];
};
export const selectNextPlaylistSongs = (state: RootState) => {
  //favorites
  if (state.player.nextPlaylistId === 100) {
    return state.favorites;
  }

  //normal playlist
  let playlist = state.playlists.find(
    (playlist) => playlist.id === state.player.nextPlaylistId
  )?.playlist;
  if (playlist !== undefined) {
    return playlist;
  }

  //artist playlist
  playlist = state.artists.find(
    (playlist) => playlist.id === state.player.nextPlaylistId
  )?.playlist;
  if (playlist !== undefined) {
    return playlist;
  }

  //default empty
  return [] as Song[];
};
export const selectPrevPlaylist = (state: RootState) => {
  //normal playlist
  let playlist = state.playlists.find(
    (playlist) => playlist.id === state.player.prevPlaylistId
  );
  if (playlist !== undefined) {
    return playlist;
  }

  //artist playlist
  playlist = state.artists.find(
    (playlist) => playlist.id === state.player.prevPlaylistId
  );
  if (playlist !== undefined) {
    return playlist;
  }

  //default favorites
  return {
    id: 100,
    name: "My favorite songs",
    playlist: state.favorites,
  };
};
