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
      <body className={`${neucha.className} flex flex-col`}>
        <Navbar />
        <main className="w-full my-10 mx-auto px-1 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
