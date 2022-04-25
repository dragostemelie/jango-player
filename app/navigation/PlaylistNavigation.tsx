import React from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlaylistScreen from "screens/PlaylistScreen";
import PlaylistsScreen from "screens/PlaylistsScreen";

export type RootStackParamList = {
  Playlists: undefined;
  Playlist: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PlaylistNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Playlists"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Playlists" component={PlaylistsScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
    </Stack.Navigator>
  );
}
