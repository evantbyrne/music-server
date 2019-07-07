/**
 * @param {Array} songs An array of songs.
 * @returns {Array} An array of artist names.
 */
export function artistsFromSongList(songs) {
  const artists = [];
  for (let i = 0; i < songs.length; i++) {
    for (let j = 0; j < songs[i].artists.length; j++) {
      const artistName = songs[i].artists[j].name;
      if (!artists.includes(artistName)) {
        artists[artists.length] = artistName;
      }
    }
  }
  return artists;
}


/**
 * @param {int|null} currentSongIndex The current song index in now playing.
 * @param {Array} nowPlaying An array of songs.
 * @return {Object|null} Current song when given a non-null index, null otherwise.
 */
export function currentSongFromIndex(currentSongIndex, nowPlaying) {
  return (currentSongIndex !== null
    ? nowPlaying.find((song, index) => currentSongIndex === index)
    : null);
}
