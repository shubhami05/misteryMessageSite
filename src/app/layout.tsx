import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import './globals.css'
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Mystery Message",
  description: "Welcome to the world of messages from unknowns",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Analytics/>
        </body>
      </AuthProvider>
    </html>
  );
}
