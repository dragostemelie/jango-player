import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "config/styles";
import PlaylistScreen from "screens/PlaylistScreen";
import PlaylistsScreen from "screens/PlaylistsScreen";
import ArtistScreen from "screens/ArtistScreen";

export type RootStackParamList = {
  Playlists: undefined;
  Playlist: undefined;
  Artist: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PlaylistNavigation() {
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.darkBlack }}>
      <Stack.Navigator
        initialRouteName="Playlists"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Playlists" component={PlaylistsScreen} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="Artist" component={ArtistScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
