"use client"

import Display from '@/components/Display';
import JoinUs from '@/components/JoinUs';
import Neoxa from '@/components/Neoxa';
import SmartnodesStats from '@/components/SmartnodesStats';

export default function Home() {
  return (
    <main className="min-h-screen  text-white px-12 pt-9 pb-5 sm:px-18 md:px-22" >
      {/* Display */}
      <Display />
      {/* Neoxa */}
      <Neoxa />
      {/* Smartnodes Stats */}
      <SmartnodesStats />
      {/* Join Us */}
      <JoinUs />
    </main>
  )
}
