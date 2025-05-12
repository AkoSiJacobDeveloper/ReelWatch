'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { Movie, Genre, getMoviesByGenre, getGenres, getImageUrl } from '@/lib/tmdb';
import { toast } from 'react-hot-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<{ [key: number]: Movie[] }>({});
  const [addingToWatchlist, setAddingToWatchlist] = useState<number | null>(null);

  // Fetch genres and movies
  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const genresList = await getGenres();
        setGenres(genresList);

        // Fetch movies for each genre
        const moviesData: { [key: number]: Movie[] } = {};
        await Promise.all(
          genresList.map(async (genre) => {
            const movies = await getMoviesByGenre(genre.id);
            moviesData[genre.id] = movies;
          })
        );
        setMoviesByGenre(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
        toast.error('Failed to load movies. Please try again later.');
      }
    };

    fetchMoviesData();
  }, []);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/Auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const addToWatchlist = async (movie: Movie) => {
    if (!user) return;

    setAddingToWatchlist(movie.id);
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      const movieData = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview,
        addedAt: new Date().toISOString()
      };

      if (!userDoc.exists()) {
        // Create user document with watchlist
        await setDoc(userRef, {
          email: user.email,
          watchlist: [movieData]
        });
      } else {
        const currentData = userDoc.data();
        const currentWatchlist = currentData.watchlist || [];
        
        // Check if movie is already in watchlist
        if (currentWatchlist.some((m: any) => m.id === movie.id)) {
          toast.error('Movie is already in your watchlist');
          return;
        }

        // Add new movie to watchlist
        await setDoc(userRef, {
          ...currentData,
          watchlist: [...currentWatchlist, movieData]
        });
      }
      
      toast.success(`Added "${movie.title}" to your watchlist!`);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast.error('Failed to add movie to watchlist. Please try again.');
    } finally {
      setAddingToWatchlist(null);
    }
  };

  const scrollMovies = (genreId: number, direction: 'left' | 'right') => {
    const container = document.getElementById(`movies-${genreId}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-[#A31621] border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="min-h-screen text-white">
      <main className="max-w-[98%] py-8">
        <h2 className="text-3xl font-bold mb-8">Discover Movies</h2>
        
        {genres.map((genre) => (
          <div key={genre.id} className="mb-12 relative group">
            <h3 className="text-2xl font-semibold mb-4">{genre.name}</h3>
            
            {/* Scroll buttons */}
            <button 
              onClick={() => scrollMovies(genre.id, 'left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={() => scrollMovies(genre.id, 'right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Movies container */}
            <div 
              id={`movies-${genre.id}`}
              className="flex overflow-x-auto space-x-6 pb-6 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {moviesByGenre[genre.id]?.map((movie) => (
                <div 
                  key={movie.id} 
                  className="flex-none w-[280px] bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-[400px] w-full">
                    {movie.poster_path ? (
                      <Image
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">No Poster Available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col mb-3">
                      <h4 className="text-lg font-semibold line-clamp-1">{movie.title}</h4>
                      <span className="text-sm text-gray-400">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 flex items-center gap-1">
                        <span className="text-lg">★</span> 
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <button
                        onClick={() => addToWatchlist(movie)}
                        disabled={addingToWatchlist === movie.id}
                        className={`px-4 py-2 rounded cursor-pointer text-sm font-medium ${
                          addingToWatchlist === movie.id
                            ? 'bg-gray-600'
                            : 'bg-[#A31621] hover:bg-red-700'
                        } transition-colors`}
                      >
                        {addingToWatchlist === movie.id ? 'Adding...' : 'Add to Watchlist'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
