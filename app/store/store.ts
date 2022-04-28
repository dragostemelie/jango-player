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
import { PlaylistItem } from "types";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["playlists", "player"],
};

const rootReducer = combineReducers({
  player,
  playlists,
  favorites,
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
  return (
    state.playlists.find((list) => list.id === state.player.currentPlaylistId)
      ?.playlist || []
  );
};
export const selectNextPlaylist = (state: RootState) => {
  return state.playlists.find(
    (list) => list.id === state.player.nextPlaylistId
  ) as PlaylistItem;
};
export const selectPlaylists = (state: RootState) => {
  return state.playlists;
};
export const selectFavorites = (state: RootState) => {
  return state.favorites;
};
