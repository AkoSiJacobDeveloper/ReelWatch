import Link from "next/link";

export default function Layout({children}: {children: React.ReactNode}) {
      return(  <div className="w-full">
            <header className="flex justify-between px-[8rem] py-9">
            <Link href={'/'} className="text-2xl font-bold">
                Reel<span className="bg-[#A31621]">Watch</span>
            </Link>
            <nav className="flex gap-5 justify-center items-center">
               <Link href="/Auth/register" className="">Register</Link>
               <Link href="/Auth/login" className="bg-[#A31621] text-white px-4 py-2 rounded-md">Login</Link>
            </nav>
            </header>
            <main className="px-[8rem] py-9">{children}</main>
        </div>
      )
}

