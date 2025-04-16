"use client"
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import LogoutModal from './LogoutModal';
import { useRouter } from 'next/navigation';
import NotificationModal from './NotificationModal';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [userAccountOpen, setUserAccountOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [viewedNotificationIds, setViewedNotificationIds] = useState(new Set());
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [accountUsername, setAccountUsername] = useState<string>('user');
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const accountButtonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  // Check if user login
  useEffect(() => {
    async function verifyLogin(): Promise<void> {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        console.log("$%myaccount$%", data);

        if (!data.authenticated) {
          setUserAccountOpen(false);
          console.log("User not logged in yet!");
          return;
        }

        const userID = data.userId;
        const response1 = await fetch('/api/auth/myaccount/fetchusername', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userid: userID
          })
        });

        if (!response1.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response1.json();
        console.log("🙌username", userData.data);
        setAccountUsername(userData.data || 'user');
        setUserAccountOpen(true);
      } catch (error) {
        console.error("Error:", error);
        setUserAccountOpen(false);
      }
    }

    verifyLogin();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setNotifications(data.notifications);
        // Check if any notification hasn't been viewed
        const hasUnread = data.notifications.some((n: any) => !viewedNotificationIds.has(n.id));
        setHasUnreadNotifications(hasUnread);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setNotifications([]);
        setHasUnreadNotifications(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [viewedNotificationIds]);

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
    // Mark all current notifications as viewed
    const newViewedIds = new Set([...viewedNotificationIds, ...notifications.map((n: any) => n.id)]);
    setViewedNotificationIds(newViewedIds);
    setHasUnreadNotifications(false);
  };

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
        <div className="hidden xl:flex space-x-8">
          <Link href="/sharednodes" className="hover:text-blue-400 font-family-sora text-xl text-[#B0B0B0] transition-colors duration-400">SHARED NODES</Link>
          <Link href="/privatenodes" className="hover:text-blue-400 font-family-sora text-xl text-[#B0B0B0] transition-colors duration-400">PRIVATE NODES</Link>
          <Link href="/dashboard" className="hover:text-blue-400 font-family-sora text-xl text-[#B0B0B0] transition-colors duration-400">DASHBOARD</Link>
        </div>
        <div className="flex justify-between items-center gap-[23px]">
          <div className="relative xl:hidden">
            <button ref={menuButtonRef} onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <XIcon className="h-6 w-6 cursor-pointer" /> : <MenuIcon className="h-6 w-6 cursor-pointer" />}
            </button>
            {menuOpen && menuButtonRef.current && (
              <div className="absolute top-3 left-3 -translate-x-full border-[1px] border-[#00AEB9] bg-[#272E50] rounded-[18px] flex flex-col justify-center items-start space-y-3 pl-[20px] pt-[20px] w-[150px] h-[200px] md:w-[150px] md:h-[120px] z-50">
                <Link href="/sharednodes" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">SARED NODES</Link>
                <Link href="/privatenodes" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 text-[14px] font-family-sora  text-white transition-colors duration-300">PRIVATE NODES</Link>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">DASHBOARD</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="md:hidden hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">LOG IN</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="md:hidden hover:text-blue-400 text-[14px] font-family-sora text-white transition-colors duration-300">SIGN UP</Link>
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center relative">
            <button
              onClick={handleNotificationClick}
              className="relative"
            >
              <Image
                src={hasUnreadNotifications ? "/navbar/real-notification.svg" : "/navbar/notification.svg"}
                alt="Notification"
                width={50}
                height={50}
                className="w-11 h-10 cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* {hasUnreadNotifications && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              )} */}
            </button>
            {/* Notification Modal */}
            <NotificationModal
                isOpen={showNotificationModal}
                onClose={() => setShowNotificationModal(false)}
                notifications={notifications}
              />
          </div>
          <div className="hidden md:flex items-center gap-[8px]">
            <Link href="/login">
              <div className="inline-block linearGradient rounded-full w-[94px] h-[36px]" style={{ "padding": "1.6px" }}>
                <button className="h-full w-full px-4 py-2 font-family-sora text-white text-[11px] bg-[#080525] rounded-full cursor-pointer">
                  LOG IN
                </button>
              </div>
            </Link>
            <Link href="/signup">
              <div className="inline-block linearGradient rounded-full w-[94px] h-[36px]" style={{ "padding": "1.6px" }}>
                <button className="h-full w-full px-4 py-2 font-family-sora text-white text-[11px] bg-[#080525] rounded-full cursor-pointer">
                  SIGN UP
                </button>
              </div>
            </Link>
          </div>
          <div className="relative">
            <button ref={accountButtonRef} onClick={() => setAccountOpen((accountOpen)=>!accountOpen)} className='hidden md:block cursor-pointer'>
              <Image src="/navbar/account.svg" alt="User" width={50} height={50} className='w-11 h-10' />
            </button>
            {userAccountOpen && accountOpen && accountButtonRef.current && (
              <div className="absolute top-15 right-0 h-[156px] w-[151px] border-[1px] border-[#00AEB9] bg-[#272E50] rounded-[10px] 
              flex flex-col pt-[17px] pr-[39px] pb-[12px] pl-[11px] z-50">
                <h1 className='text-white text-[13px] font-family-sora font-semibold pb-[21px]'>{accountUsername}</h1>
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
      </nav>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onDisable={() => setUserAccountOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
} 