import type { Metadata } from "next";
import { Neucha } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav";
import Footer from "@/components/footer";

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
      <body
        className={`${neucha.className} flex flex-col pt-2 md:pt-0 px-2 md:px-0`}
      >
        <header>
          <Navbar />
        </header>
        <main className="w-full mt-10 mb-12 mx-auto px-1 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
