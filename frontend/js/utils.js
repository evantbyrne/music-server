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


/**
 * @param {int|null} currentSongIndex The current song index in now playing.
 * @param {Array} nowPlaying An array of songs.
 * @param {Array} nowPlayingRemoved An array of now playing indexes.
 * @return {Object|null} Object containing the next song and its now playing index on success, null otherwise.
 */
export function nextSongFromIndex(currentSongIndex, nowPlaying, nowPlayingRemoved) {
  for (let i = currentSongIndex + 1; i < nowPlaying.length; i++) {
    if (!nowPlayingRemoved.includes(i)) {
      return {
        index: i,
        song: nowPlaying[i],
      };
    }
  }
  return null;
}


/**
 * @param {int|null} currentSongIndex The current song index in now playing.
 * @param {Array} nowPlaying An array of songs.
 * @param {Array} nowPlayingRemoved An array of now playing indexes.
 * @return {Object|null} Object containing the previous song and its now playing index on success, null otherwise.
 */
export function previousSongFromIndex(currentSongIndex, nowPlaying, nowPlayingRemoved) {
  for (let i = currentSongIndex - 1; i >= 0 && i < nowPlaying.length; i--) {
    if (!nowPlayingRemoved.includes(i)) {
      return {
        index: i,
        song: nowPlaying[i],
      };
    }
  }
  return null;
}
