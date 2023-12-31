import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import AblyProviders from "@/components/AblyProviders";
import { Toaster } from "@/components/ui/toaster";

const inter = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrackerTeam",
  description: "Made using Ably",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <AblyProviders>
          <body className={inter.className}>
            <Header />
            {children}
            <Toaster />
          </body>
        </AblyProviders>
      </Providers>
    </html>
  );
}
