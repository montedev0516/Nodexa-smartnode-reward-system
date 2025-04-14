import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Nodexa Rewards System",
  description: "nodexa smartnodes rewards system",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function NoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
