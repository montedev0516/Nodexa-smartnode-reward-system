import type { Metadata } from "next";
import "@/app/globals.css";

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
      <body>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
