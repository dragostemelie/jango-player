import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import store from "store/store";
import PlaylistNavigation from "navigation/PlaylistNavigation";
import theme from "navigation/NavigationTheme";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <PlaylistNavigation />
      </NavigationContainer>
    </Provider>
  );
}
