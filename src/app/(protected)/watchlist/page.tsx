'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { getImageUrl } from '@/lib/tmdb';
import { toast } from 'react-hot-toast';
import { Pencil, X, Save, Trash2 } from 'lucide-react';

interface WatchlistMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  addedAt: string;
  userNotes?: string;
}

export default function WatchlistPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<WatchlistMovie[]>([]);
  const [removingMovie, setRemovingMovie] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchWatchlist(currentUser.uid);
      } else {
        router.push('/Auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchWatchlist = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists() && userDoc.data().watchlist) {
        const watchlist = userDoc.data().watchlist;
        setMovies(watchlist.sort((a: WatchlistMovie, b: WatchlistMovie) => 
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        ));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      toast.error('Failed to load watchlist');
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (movie: WatchlistMovie) => {
    if (!user) return;

    setRemovingMovie(movie.id);
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const currentData = userDoc.data();
      
      if (currentData && currentData.watchlist) {
        const updatedWatchlist = currentData.watchlist.filter(
          (m: WatchlistMovie) => m.id !== movie.id
        );
        
        await updateDoc(userRef, {
          watchlist: updatedWatchlist
        });
        
        setMovies(updatedWatchlist);
        toast.success(`Removed "${movie.title}" from your watchlist`);
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast.error('Failed to remove movie from watchlist');
    } finally {
      setRemovingMovie(null);
    }
  };

  const startEditingNote = (movie: WatchlistMovie) => {
    setEditingNote(movie.id);
    setNoteText(movie.userNotes || '');
  };

  const saveNote = async (movie: WatchlistMovie) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const currentData = userDoc.data();
      
      if (currentData && currentData.watchlist) {
        const updatedWatchlist = currentData.watchlist.map((m: WatchlistMovie) => 
          m.id === movie.id ? { ...m, userNotes: noteText } : m
        );
        
        await updateDoc(userRef, {
          watchlist: updatedWatchlist
        });
        
        setMovies(updatedWatchlist);
        setEditingNote(null);
        toast.success('Note saved successfully');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-[#A31621] border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="max-w-[98%] ">
      <h2 className="text-3xl font-bold mb-8">My Watchlist</h2>
      
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
          <button
            onClick={() => router.push('/home')}
            className="bg-[#A31621] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Discover Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative h-[400px] w-full">
                {movie.poster_path ? (
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No Poster Available</span>
                  </div>
                )}
                <button
                  onClick={() => removeFromWatchlist(movie)}
                  disabled={removingMovie === movie.id}
                  className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-col mb-3">
                  <h4 className="text-lg font-semibold line-clamp-1">{movie.title}</h4>
                  <span className="text-sm text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-yellow-400">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">My Notes</span>
                    {editingNote === movie.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveNote(movie)}
                          className="p-1 hover:text-[#A31621] transition-colors"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingNote(null)}
                          className="p-1 hover:text-[#A31621] transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditingNote(movie)}
                        className="p-1 hover:text-[#A31621] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {editingNote === movie.id ? (
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full h-24 px-3 py-2 text-sm bg-gray-700 rounded border border-gray-600 focus:border-[#A31621] focus:ring-1 focus:ring-[#A31621] outline-none transition-colors resize-none"
                      placeholder="Add your notes here..."
                    />
                  ) : (
                    <p className="text-sm text-gray-400 min-h-[3rem] line-clamp-2">
                      {movie.userNotes || 'No notes added yet'}
                    </p>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Added {new Date(movie.addedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
