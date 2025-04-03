import type { Metadata } from "next";
import "@/app/globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nodexa Hosting",
  description: "nodexa smartnodes rewards system",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>
  );
}

// style={{ background: 'radial-gradient(70.4% 21.4% at 53.16% 33.22%, #1A459C 0%, #080525 100%)' }} 