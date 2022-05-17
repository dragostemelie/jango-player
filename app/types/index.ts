export type Song = {
  album: string | null;
  artist: string;
  artist_station_id: number;
  album_art?: string;
  station: string;
  song: string;
  song_id: number;
  url: string;
};

export type Playlist = Song[];

export type PlaylistItem = {
  id: number;
  name: string;
  playlist: Song[];
};
