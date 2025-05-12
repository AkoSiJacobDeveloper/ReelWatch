import { Film } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="py-5 md:px-19 border-t border-gray-800 flex justify-center flex-col items-center">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className='flex justify-center flex-col' >
        <div className="flex items-center space-x-2 mb-4">
          <p className="text-2xl font-bold">
          Reel<span className="bg-[#A31621] rounded">Watch</span>
          </p>
        </div>
        <p className="text-sm text-gray-400">Your personal movie companion for discovering and tracking films.</p>
      </div>
      
      <div>
        <h3 className="font-bold mb-4">Features</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><Link href="/features/watchlist" className="hover:text-white">Watchlists</Link></li>
          <li><Link href="/features/recommendations" className="hover:text-white">Recommendations</Link></li>
          <li><Link href="/features/tracking" className="hover:text-white">Progress Tracking</Link></li>
          <li><Link href="/features/social" className="hover:text-white">Social Sharing</Link></li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-bold mb-4">Resources</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
          <li><Link href="/api" className="hover:text-white">API</Link></li>
          <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-bold mb-4">Legal</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
        </ul>
      </div>
    </div>
    
    <div className="mt-12 pt-8 border-t border-gray-800 text-center">
      <p className="text-sm text-gray-400">© {new Date().getFullYear()} RealWatch. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer
