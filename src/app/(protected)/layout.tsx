'use client';

import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';

export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/Auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/Auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex">
              <Link href="/home" className="flex items-center">
                <span className="text-xl font-bold text-white">
                  Reel<span className="bg-[#A31621] px-1 rounded">Watch</span>
                </span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  href="/home"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === '/home' 
                      ? 'text-white border-b-2 border-[#A31621]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/watchlist"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === '/watchlist' 
                      ? 'text-white border-b-2 border-[#A31621]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  My Watchlist
                </Link>
                <Link 
                  href="/about"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === '/about' 
                      ? 'text-white border-b-2 border-[#A31621]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  About
                </Link>
                <Link 
                  href="/contact"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === '/contact' 
                      ? 'text-white border-b-2 border-[#A31621]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right side - Welcome message and Sign Out */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 hidden sm:block">
                Welcome, {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-[#A31621] text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                type="button"
                className="text-gray-300 hover:text-white"
                onClick={toggleMobileMenu}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
            <Link
              href="/home"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/home'
                  ? 'text-white bg-[#A31621]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/watchlist"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/watchlist'
                  ? 'text-white bg-[#A31621]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              onClick={toggleMobileMenu}
            >
              My Watchlist
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/about'
                  ? 'text-white bg-[#A31621]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/contact'
                  ? 'text-white bg-[#A31621]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content with Animation and Padding for Fixed Header */}
      <motion.main
        className="max-w-7xl mx-auto pt-24 pb-6 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}