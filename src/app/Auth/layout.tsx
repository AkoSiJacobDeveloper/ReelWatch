import Link from "next/link";

export default function Layout({children}: {children: React.ReactNode}) {
      return(  
        <div className="w-full">
            <nav className="flex justify-between items-center py-6 px-8 md:px-16">
                <Link href={'/'} className="text-2xl font-bold">
                    Reel<span className="bg-[#A31621] rounded">Watch</span>
                </Link>
                    
                <div className="flex space-x-4">
                    <Link href="/Auth/login" className="px-4 py-2 rounded hover:bg-gray-800 transition">Login</Link>
                    <Link href="/Auth/register" className="px-4 py-2 bg-[#A31621] rounded hover:bg-red-700 transition">Register</Link>
                </div>
            </nav>
            <main className="px-[8rem] py-9">{children}</main>
        </div>
      )
}

