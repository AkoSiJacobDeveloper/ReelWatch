'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Play, Film, List, Star, Calendar, Bookmark } from 'lucide-react';
import Footer from '@/components/Footer';

const LandingPage = () => {
  // Mock featured movies data
  const featuredMovies = [
    { id: 1, title: "Inception", genre: "Sci-Fi", rating: 4.8 },
    { id: 2, title: "The Shawshank Redemption", genre: "Drama", rating: 4.9 },
    { id: 3, title: "The Dark Knight", genre: "Action", rating: 4.7 }
  ];
  
  const [email, setEmail] = useState('');
  
  return (
    <div className="h-screen to-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8 md:px-16">
        <p className="text-2xl font-bold">
          Reel<span className="bg-[#A31621] rounded">Watch</span>
        </p>
            
        <div className="flex space-x-4">
          <Link href="/Auth/login" className="px-4 py-2 rounded hover:bg-gray-800 transition">Login</Link>
          <Link href="/Auth/register" className="px-4 py-2 bg-[#A31621] rounded hover:bg-red-700 transition">Register</Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-center px-8 md:px-16  h-screen">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Track, Discover, and Enjoy Your <span className="text-[#A31621]">Perfect Movie Night</span>
          </h1>
          <p className="text-lg text-gray-300">
            Never lose track of movies you want to watch. Create watchlists, track your progress, and discover new films tailored to your taste.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/home" className="px-8 py-3 bg-[#A31621] rounded-lg text-center hover:bg-red-700 transition font-medium">
              Get Started — It's Free
            </Link>
            <Link href="/features" className="px-8 py-3 border border-gray-600 rounded-lg text-center hover:bg-gray-800 transition font-medium">
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="mt-12 md:mt-0 md:w-2/5">
          <div className="relative">
            <div className="absolute -inset-1 bg-[#A31621] rounded-lg opacity-30 blur-lg"></div>
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">My Watchlist</h3>
                <span className="text-sm text-gray-400">3 movies</span>
              </div>
              {featuredMovies.map(movie => (
                <div key={movie.id} className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <h4 className="font-medium">{movie.title}</h4>
                    <p className="text-sm text-gray-400">{movie.genre}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-yellow-400" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link href="/explore" className="text-red-400 hover:text-red-300 flex items-center justify-center">
                  <span>Discover more movies</span>
                  <Play size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-8 md:px-16 flex flex-col gap-20 h-screen">
        <h2 className="text-3xl font-bold text-center">Everything You Need for Your Movie Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex justify-center items-center">
            <div className="bg-gray-800 p-10 rounded-lg h-[400px] flex justify-center flex-col">
              <div className=''>
                <div className="bg-[#A31621] w-15 h-15 rounded-full flex items-center justify-center mb-4">
                  <List size={40} />
                </div>
              </div>
              <div> 
                <h3 className="text-xl font-semibold mb-2">Create Watchlists</h3>
                <p className="text-gray-300">Organize movies by genre, mood, or create custom lists to share with friends.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="bg-gray-800 p-10 rounded-lg min-h-[400px] flex justify-center flex-col feature-card">
              <div className="bg-[#A31621] w-15 h-15 rounded-full flex items-center justify-center mb-4">
                <Star size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rate & Review</h3>
              <p className="text-gray-300">Keep track of your thoughts and rate movies you've watched to improve recommendations.</p>
            </div>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="bg-gray-800 p-10 rounded-lg min-h-[400px] flex justify-center flex-col">
              <div className="bg-[#A31621] w-15 h-15 rounded-full flex items-center justify-center mb-4">
                <Calendar size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Release Reminders</h3>
              <p className="text-gray-300">Never miss a new release with personalized notifications for upcoming movies.</p>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-8 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg min-h-[400px]">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#A31621] rounded-full mr-3"></div>
                <div className=''>
                  <h4 className="font-medium">Alex Johnson</h4>
                  <p className="text-sm text-gray-400">Film Enthusiast</p>
                </div>
              </div>
              <div className='flex justify-center items-center h-[40vh]'>
                <p className="text-gray-300">"MovieTracker completely changed how I keep track of films. The interface is intuitive and the recommendations are spot on!"</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#A31621] rounded-full mr-3"></div>
              <div>
                <h4 className="font-medium">Sarah Miller</h4>
                <p className="text-sm text-gray-400">Premium User</p>
              </div>
            </div>
            <div className='flex justify-center items-center h-[40vh]'>
              <p className="text-gray-300 mb-4">"I've discovered so many hidden gems thanks to MovieTracker's recommendation system. Worth every penny!"</p>
            </div>
            
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#A31621] rounded-full mr-3"></div>
              <div>
                <h4 className="font-medium">Michael Chen</h4>
                <p className="text-sm text-gray-400">Movie Club Organizer</p>
              </div>
            </div>
            <div className='flex justify-center items-center h-[40vh]'>
              <p className="text-gray-300 mb-4">"The social features make movie nights with friends so much easier to plan. We can all contribute to a shared watchlist!"</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#A31621] rounded-full mr-3"></div>
              <div>
                <h4 className="font-medium">John Michael Feltimos</h4>
                <p className="text-sm text-gray-400">SSG President</p>
              </div>
            </div>
            <div className='flex justify-center items-center h-[40vh]'>
              <p className="text-gray-300 mb-4">"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur voluptatem, quidem libero temporibus, at quis nam architecto nemo quod quas maiores, minus eaque sit quaerat animi alias voluptatum. Doloribus, molestias!"</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#A31621] rounded-full mr-3"></div>
              <div>
                <h4 className="font-medium">Jeferson Bayking</h4>
                <p className="text-sm text-gray-400">College Governor</p>
              </div>
            </div>
            <div className='flex justify-center items-center h-[40vh]'>
              <p className="text-gray-300 mb-4">"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur voluptatem, quidem libero temporibus, at quis nam architecto nemo quod quas maiores, minus eaque sit quaerat animi alias voluptatum. Doloribus, molestias!"</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#A31621] rounded-full mr-3"></div>
              <div>
                <h4 className="font-medium">John Jeric Polison</h4>
                <p className="text-sm text-gray-400">OSAD Coordinator</p>
              </div>
            </div>
            <div className='flex justify-center items-center h-[40vh]'>
              <p className="text-gray-300 mb-4">"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur voluptatem, quidem libero temporibus, at quis nam architecto nemo quod quas maiores, minus eaque sit quaerat animi alias voluptatum. Doloribus, molestias!"</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-8 md:px-16 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Movie Journey?</h2>
          <p className="text-gray-300 mb-8">Join thousands of movie enthusiasts who have transformed their watching experience.</p>
          
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-[#A31621] rounded-lg font-medium hover:bg-red-700 transition"
            >
              Get Started
            </button>
          </form>
          
          <p className="mt-4 text-sm text-gray-400">No credit card required. Start with our free plan today.</p>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
   
    </div>
  );
};

export default LandingPage;