'use client';

import { motion } from 'framer-motion';
import { Database, Edit, Film, Trash2 } from 'lucide-react';

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const crudFeatures = [
    {
      operation: "Create",
      icon: <Film className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Add your favorite movies to your personal watchlist with a simple click. Each movie you add is saved to your profile, allowing you to build a curated collection of films you want to watch.",
      example: "Click the '+' button on any movie card to add it to your watchlist."
    },
    {
      operation: "Read",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Browse through an extensive collection of movies fetched from TMDB API. View your saved watchlist with detailed information about each movie, including posters, ratings, and release dates.",
      example: "Scroll through movie categories on the home page or view your saved movies in the watchlist."
    },
    {
      operation: "Update",
      icon: <Edit className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Personalize your movie entries by adding and editing notes for each film in your watchlist. Keep track of your thoughts, recommendations, or things to watch out for.",
      example: "Click the pencil icon on any movie in your watchlist to add or edit your notes."
    },
    {
      operation: "Delete",
      icon: <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Remove movies from your watchlist when you've watched them or changed your mind. Your watchlist stays clean and relevant to your current interests.",
      example: "Click the trash icon on any movie card in your watchlist to remove it."
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">About Reel<span className="bg-[#A31621] rounded">Watch</span></p>
          <p className="text-lg sm:text-xl text-gray-400 px-4">
            Your personal movie tracking companion with powerful CRUD functionality
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {crudFeatures.map((feature, index) => (
            <motion.div
              key={feature.operation}
              className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-[#A31621] rounded-lg text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {feature.operation}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                {feature.description}
              </p>
              <div className="bg-gray-700 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-semibold text-[#A31621]">Example: </span>
                  {feature.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 sm:mt-16 text-center bg-gray-800 rounded-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Built with Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {["Next.js", "Firebase", "TMDB API", "Tailwind CSS", "TypeScript"].map((tech) => (
              <span
                key={tech}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 