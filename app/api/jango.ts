import { create } from "apisauce";
import { Song } from "types";

export const JangoApi = create({
  baseURL: "https://www.jango.com",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const getPlaylistSong = async (playlist: number) => {
  const response = await JangoApi.get<Song>(`/stations/${playlist}/play`);
  if (response.ok) return response.data;
};
