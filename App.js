import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import App from 'App.tsx';

AppRegistry.registerComponent('jango-player', () => App);
TrackPlayer.registerPlaybackService(() => require('utils/playerService'));

export default App;
