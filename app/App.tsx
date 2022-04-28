import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { store, persistor } from "store/store";
import PlaylistNavigation from "navigation/PlaylistNavigation";
import theme from "navigation/NavigationTheme";

import AppScreen from "components/Screen";
import Player from "components/Player";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={theme}>
          <AppScreen>
            <PlaylistNavigation />
            <Player />
          </AppScreen>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
