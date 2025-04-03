"use client"
import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import LogoutModal from './LogoutModal';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const accountButtonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Close the account dropdown and logout modal
        setAccountOpen(false);
        setLogoutModalOpen(false);
        
        // Redirect to home page
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
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
              <div className="absolute top-3 left-3 -translate-x-full border-[1px] border-[#00AEB9] bg-[#272E50] rounded-[18px] flex flex-col justify-center items-start space-y-3 pl-[20px] pt-[20px] w-[150px] h-[200px] md:w-[150px] md:h-[120px] ">
                <Link href="/sharednodes" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">SARED NODES</Link>
                <Link href="/privatenodes" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 text-[14px] font-family-sora  text-white transition-colors duration-300">PRIVATE NODES</Link>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">DASHBOARD</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="md:hidden hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">LOG IN</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="md:hidden hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">SIGN UP</Link>
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
              <button ref={accountButtonRef} onClick={() => setAccountOpen(!accountOpen)} className='hidden md:block cursor-pointer'>
                <Image src="/navbar/account.svg" alt="User" width={50} height={50} className='w-11 h-10' />
              </button>
              {accountOpen && accountButtonRef.current && (
                <div className="absolute top-15 right-0 h-[156px] w-[151px] border-[1px] border-[#00AEB9] bg-[#272E50] rounded-[10px] 
                flex flex-col pt-[17px] pr-[39px] pb-[12px] pl-[11px]">
                  <h1 className='text-white text-[13px] font-family-sora font-semibold pb-[21px]'>Savvas</h1>
                  <Link href="/myaccount" onClick={() => setAccountOpen(false)}>
                  <div className="flex flex-row justify-start items-center gap-[9px] pb-[15px] cursor-pointer">
                    <Image src="/myaccount/profile-icon.svg" alt="User" width={50} height={50} className='w-[18px] h-[18px]' />
                    <div className="text-white text-[12px] font-regular font-family-sora">My Account</div>
                  </div>
                  </Link>
                  <Link href="/billing" onClick={() => setAccountOpen(false)}>
                  <div className="flex flex-row justify-start items-center gap-[9px] pb-[15px] cursor-pointer">
                    <Image src="/myaccount/dollar-sign.svg" alt="User" width={50} height={50} className='w-[18px] h-[18px]' />
                    <div className="text-white text-[12px] font-regular font-family-sora">Billing</div>
                  </div>
                  </Link>
                  <div 
                    className="flex flex-row justify-start items-center gap-[9px] cursor-pointer" 
                    onClick={() => {
                      setAccountOpen(false);
                      setLogoutModalOpen(true);
                    }}
                  >
                    <Image src="/myaccount/logout-icon.svg" alt="User" width={50} height={50} className='w-[18px] h-[18px]' />
                    <div className="text-white text-[12px] font-regular font-family-sora">Log Out</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
} 