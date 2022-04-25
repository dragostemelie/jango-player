import TrackPlayer, { Event } from 'react-native-track-player';

module.exports = async function () {
  // This service needs to be registered for the module to work
  TrackPlayer.addEventListener(Event.RemotePlay, event => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, event => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
};
