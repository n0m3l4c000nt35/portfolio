"use client";

import { useState } from "react";
import NavLink from "./nav-link";
import { RxCross2 } from "react-icons/rx";
import { LuMenu } from "react-icons/lu";

const links = [
  { id: 1, href: "/", title: "Inicio" },
  { id: 2, href: "/educacion", title: "Educación" },
  { id: 3, href: "/habilidades", title: "Habilidades" },
  { id: 4, href: "/proyectos", title: "Proyectos" },
  { id: 5, href: "/experiencia", title: "Experiencia" },
  { id: 6, href: "/contacto", title: "Contacto" },
  { id: 7, href: "https://n0m3l4c000nt35.vercel.app/", title: "Blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="md:pt-10">
      <div className="fixed top-0 right-0 flex p-1 bg-white">
        <button
          className="md:hidden text-3xl z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <RxCross2 /> : <LuMenu />}
        </button>
      </div>
      <div
        className={`fixed top-0 md:top-4 left-0 md:w-full p-2 bg-white flex flex-col gap-y-1 md:flex-row md:justify-center md:rounded-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {links.map(({ id, href, title }, index) => {
          return (
            <>
              <NavLink
                key={id}
                href={href}
                title={title}
                setIsOpen={setIsOpen}
              />
              {isMobile && index < 6 && <b className="font-extrabold">|</b>}
            </>
          );
        })}
      </div>
    </nav>
  );
}
