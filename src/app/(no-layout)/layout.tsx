import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Nodexa Hosting",
  description: "nodexa smartnodes rewards system",
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
