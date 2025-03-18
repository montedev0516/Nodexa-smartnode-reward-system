"use client"
import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <nav className="flex justify-between items-center px-[83px] pt-18 pb-9">
      <Link href="/">
        <button className="flex items-center cursor-pointer">
          <Image src="navbar/logo-nodexa.svg" alt="Nodexa Hosting" width={200} height={50} className="w-[200px] h-[60px] shrink-0" />
        </button>
      </Link>
      <div className="hidden xl:flex space-x-4">
        <Link href="/sharednodes" className="hover:text-blue-400 font-family-sora text-xl text-[#B0B0B0] transition-colors duration-400">SAHRED NODES</Link>
        <Link href="/privatenodes" className="hover:text-blue-400 font-family-sora text-xl text-[#B0B0B0] transition-colors duration-400">PRIVATE NODES</Link>
        <Link href="/dashboard" className="hover:text-blue-400 font-family-sora text-xl text-[#B0B0B0] transition-colors duration-400">DASHBOARD</Link>
      </div>
      <div className="flex justify-between items-center space-x-4">
        <div className="relative xl:hidden">
          <button ref={menuButtonRef} onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? <XIcon className="h-6 w-6 cursor-pointer" /> : <MenuIcon className="h-6 w-6 cursor-pointer" />}
          </button>
          {menuOpen && menuButtonRef.current && (
            <div className="absolute top-3 left-3 -translate-x-full bg-[#3bb18a] flex flex-col items-center space-y-4 p-4 border-2 border-white rounded-lg shadow-lg w-[250px] h-[250px] md:w-[200px] md:h-[150px] ">
              <Link href="/sharednodes" className="hover:text-blue-400 text-xl font-family-sora text-[#B0B0B0] transition-colors duration-300">SARED NODES</Link>
              <Link href="/privatenodes" className="hover:text-blue-400 text-xl font-family-sora   text-[#B0B0B0] transition-colors duration-300">PRIVATE NODES</Link>
              <Link href="/dashboard" className="hover:text-blue-400 text-xl font-family-sora text-[#B0B0B0] transition-colors duration-300">DASHBOARD</Link>
              <Link href="/login" className="md:hidden hover:text-blue-400 text-xl font-family-sora text-[#B0B0B0] transition-colors duration-300">LOG IN</Link>
              <Link href="/signup" className="md:hidden hover:text-blue-400 text-xl font-family-sora text-[#B0B0B0] transition-colors duration-300">SIGN UP</Link>
            </div>
          )}
        </div>
        <div className="hidden sm:flex items-center">
          <Image src="/navbar/notification.svg" alt="Notification" width={50} height={50} className="w-11 h-10" />
        </div>
        <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
          <Link href="/login">
            <div className="inline-block p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-full">
              <button className="h-9 w-24 px-4 py-2 font-family-sora text-white text-sm bg-[#080525] rounded-full cursor-pointer">
                LOG IN
              </button>
            </div>
          </Link>
          <Link href="/signup">
            <div className="inline-block p-[1px] bg-gradient-to-r from-[#1ec0ca] to-[#ec008c] rounded-full">
              <button className="h-9 w-24 px-4 py-2 font-family-sora text-white text-sm bg-[#080525] rounded-full cursor-pointer">
                SIGN UP
              </button>
            </div>
          </Link>
          <div className="relative">
            <button className='hidden md:block cursor-pointer'>
              <Image src="/navbar/account.svg" alt="User" width={50} height={50} className='w-11 h-10' />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 