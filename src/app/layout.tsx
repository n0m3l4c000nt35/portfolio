import type { Metadata } from "next";
import { Neucha } from "next/font/google";
import "../globals.css";
import Navbar from "@/app/components/Nav/Nav";
import Footer from "@/app/components/footer";
import Loading from "@/app/loading";
import { Suspense } from "react";

const neucha = Neucha({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Esteban Zárate",
  description: "Portfolio de Esteban Zárate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${neucha.className} flex flex-col pt-20 px-2`}>
        <Suspense fallback={<Loading />}>
          <header className="fixed top-8 w-full flex justify-center items-center">
            <Navbar />
          </header>
          <main className="w-full mt-10 mb-12 mx-auto px-1 flex-grow">
            {children}
          </main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
