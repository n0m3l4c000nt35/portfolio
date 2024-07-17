import type { Metadata } from "next";
import { Neucha } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Nav/Nav";
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
      <body className={`${neucha.className} flex flex-col pt-20 px-2`}>
        <header className="fixed top-8 w-full flex justify-center items-center">
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
