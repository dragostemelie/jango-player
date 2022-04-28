import React, { useState, useEffect, useRef } from "react";
import { FlatList, ViewToken } from "react-native";

import { getPlaylistSong } from "api/jango";
import {
  playSong,
  setCompact,
  setFavorites,
  setPlaylist,
} from "store/playerSlice";
import {
  selectFavorites,
  selectNextPlaylist,
  selectPlayer,
  selectPlaylists,
} from "store/store";
import { Song } from "types";
import { toggleFavorite } from "store/favoritesSlice";
import { updatePlaylist } from "store/playlistsSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import LoadMore from "components/LoadMores";
import SongCard from "components/SongCard";

export default function Playlist() {
  const [songsInView, setSongsInView] = useState<(number | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const player = useAppSelector(selectPlayer);
  const playlist =
    player.nextPlaylistId === 100
      ? useAppSelector(selectFavorites)
      : useAppSelector(selectNextPlaylist).playlist;
  const favorites = useAppSelector(selectFavorites);
  const nextPlaylist = useAppSelector(selectNextPlaylist);
  const dispatch = useAppDispatch();

  const flatList = useRef<FlatList>(null);
  const onViewRef = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setSongsInView(info.viewableItems.map((item) => item.index));
    }
  );

  const handleLoadMore = async () => {
    setLoading(true);
    let songs: Song[] = [];
    for (let index = 0; index < 10; index++) {
      const nextSong = await getPlaylistSong(player.nextPlaylistId);
      const songExists =
        songs.some((song) => song.song_id === nextSong?.song_id) ||
        playlist.some((song) => song.song_id === nextSong?.song_id);
      if (nextSong && !songExists) {
        const { album, artist, album_art, station, song, song_id, url } =
          nextSong;
        songs.push({ album, artist, album_art, station, song, song_id, url });
      }
    }
    dispatch(updatePlaylist({ id: player.nextPlaylistId, songs }));
    setLoading(false);
  };

  const handleToggleFavorite = (item: Song, index: number) => {
    if (
      player.currentPlaylistId === 100 &&
      player.nextPlaylistId === 100 &&
      player.currentSong === index
    ) {
      dispatch(playSong(-1));
    }
    dispatch(toggleFavorite(item));
  };

  const handleScrollIntoView = () => {
    if (player.currentSong > -1 && !songsInView.includes(player.currentSong)) {
      flatList.current?.scrollToIndex({
        index: Math.max(player.currentSong - 1, 0),
        animated: true,
      });
    }
  };

  const handleSelectSong = (index: number) => {
    if (player.currentPlaylistId !== player.nextPlaylistId) {
      dispatch(setPlaylist(nextPlaylist));
      if (player.compact) dispatch(setCompact(false));
    }
    dispatch(playSong(index));
  };

  //GET SONGS
  useEffect(() => {
    if (playlist.length === 0) handleLoadMore();
  }, [player.nextPlaylistId]);

  //ON SONG CHANGE SCROLL TO IT
  useEffect(() => {
    if (player.currentPlaylistId === player.nextPlaylistId) {
      handleScrollIntoView();
    }
  }, [player.currentSong]);

  return (
    <FlatList
      data={playlist}
      getItemLayout={(_, index) => ({
        length: 90,
        offset: 90 * index,
        index,
      })}
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={
        player.nextPlaylistId !== 100 ? (
          <LoadMore onPress={handleLoadMore} loading={loading} />
        ) : undefined
      }
      onViewableItemsChanged={onViewRef.current}
      ref={flatList}
      renderItem={({ item, index }) => (
        <SongCard
          image={item.album_art}
          title={item.song}
          subtitle={item.artist}
          isFavorite={favorites.some((song) => song.song_id === item.song_id)}
          isSelected={
            index === player.currentSong &&
            player.nextPlaylistId === player.currentPlaylistId
          }
          onToggleFavorite={() => handleToggleFavorite(item, index)}
          onSelect={() => handleSelectSong(index)}
        />
      )}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 75 }}
    />
  );
}
