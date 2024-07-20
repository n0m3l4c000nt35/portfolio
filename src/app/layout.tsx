"use client";

import type { Metadata } from "next";
import { Neucha } from "next/font/google";
import "../globals.css";
import Navbar from "@/app/components/Nav/Nav";
import Footer from "@/app/components/footer";
import Loading from "@/app/loading";
import { Suspense } from "react";
import { useBodyStyle } from "./hooks/useBodyStyle";

const neucha = Neucha({ subsets: ["latin"], weight: ["400"] });

const metadata: Metadata = {
  title: "Esteban Zárate",
  description: "Portfolio de Esteban Zárate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useBodyStyle();

  return (
    <html lang="en">
      <body className={`${neucha.className}`}>
        <Suspense fallback={<Loading />}>
          <Navbar />
          <main className="content">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
