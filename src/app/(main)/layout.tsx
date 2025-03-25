import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Nodexa Hosting",
  description: "nodexa smartnodes rewards system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// style={{ background: 'radial-gradient(70.4% 21.4% at 53.16% 33.22%, #1A459C 0%, #080525 100%)' }} 