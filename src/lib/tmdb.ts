// TMDB API configuration
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

// Function to fetch movies by genre
export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&include_adult=false`
  );
  const data = await response.json();
  return data.results;
}

// Function to fetch all genres
export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.genres;
}

// Function to get full image URL
export function getImageUrl(path: string, size: 'w500' | 'original' = 'w500'): string {
  return `https://image.tmdb.org/t/p/${size}${path}`;
} 