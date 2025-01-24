import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

// Configuración de la API de Spotify
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

export function getAuthUrl() {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "playlist-read-private",
  ];

  return `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    SPOTIFY_REDIRECT_URI
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;
}

export function setAccessToken(token: string) {
  spotifyApi.setAccessToken(token);
}

// Funciones para obtener datos de Spotify
export async function searchAlbums(query: string) {
  const response = await spotifyApi.searchAlbums(query);
  return response.albums?.items || [];
}

export async function getAlbum(id: string) {
  return await spotifyApi.getAlbum(id);
}

export async function getArtist(id: string) {
  return await spotifyApi.getArtist(id);
}

export async function getArtistAlbums(id: string) {
  const response = await spotifyApi.getArtistAlbums(id);
  return response.items || [];
}

export async function getTrack(id: string) {
  return await spotifyApi.getTrack(id);
}

export default spotifyApi;
