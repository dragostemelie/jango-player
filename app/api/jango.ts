import _ from "lodash";
import { create } from "apisauce";

import { Song } from "types";

export const JangoApi = create({
  baseURL: "https://www.jango.com",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const getPlaylistSong = async (playlistId: number) => {
  const response = await JangoApi.get<Song>(`/stations/${playlistId}/play`);
  if (response.ok) return response.data;
};

export const getPlaylistSongs = async (playlistId: number) => {
  const songs: Song[] = [];
  for (let index = 0; index < 10; index++) {
    const nextSong = await getPlaylistSong(playlistId);
    if (nextSong) {
      const {
        album,
        artist,
        artist_station_id,
        album_art,
        station,
        song,
        song_id,
        url,
      } = nextSong;
      songs.push({
        album,
        artist,
        artist_station_id,
        album_art,
        station,
        song,
        song_id,
        url,
      });
    }
  }
  return _.uniqBy([...songs], "song_id");
};
