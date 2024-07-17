"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  HomeOutline,
  SchoolOutline,
  BuildOutline,
  BriefcaseOutline,
  DocumentTextOutline,
  ChatbubbleOutline,
} from "react-ionicons";

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
  let marker = useRef<HTMLDivElement>(null);
  let list = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const moveIndicator = (target: HTMLElement) => {
    if (marker.current) {
      marker.current.style.left = `${target.offsetLeft}px`;
      marker.current.style.width = `${target.offsetWidth}px`;
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    if (list.current) {
      const listItems = list.current.querySelectorAll("li");
      listItems.forEach((li, index) => {
        li.addEventListener("mouseenter", () => handleMouseEnter(index));
        li.addEventListener("mouseleave", handleMouseLeave);
      });

      return () => {
        listItems.forEach((li, index) => {
          li.removeEventListener("mouseenter", () => handleMouseEnter(index));
          li.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }
  }, []);

  useEffect(() => {
    if (list.current) {
      const listItems = list.current.querySelectorAll("li");
      const currentIndex = links.findIndex(link => link.href === pathname);
      const targetIndex = hoveredIndex !== null ? hoveredIndex : currentIndex;

      listItems.forEach((li, index) => {
        if (index === targetIndex) {
          li.classList.add("active");
          moveIndicator(li);
        } else {
          li.classList.remove("active");
        }
      });
    }
  }, [hoveredIndex, pathname]);

  return (
    <ul className="ul-nav-component" ref={list}>
      <li className="li-nav-component">
        <Link className="a-nav-component" href="/">
          <HomeOutline cssClasses="ion-icon-nav-component" />
        </Link>
      </li>
      <li className="li-nav-component">
        <Link className="a-nav-component" href="/educacion">
          <SchoolOutline cssClasses="ion-icon-nav-component" />
        </Link>
      </li>
      <li className="li-nav-component">
        <Link className="a-nav-component" href="/habilidades">
          <BuildOutline cssClasses="ion-icon-nav-component" />
        </Link>
      </li>
      <li className="li-nav-component">
        <Link className="a-nav-component" href="/proyectos">
          <BriefcaseOutline cssClasses="ion-icon-nav-component" />
        </Link>
      </li>
      <li className="li-nav-component">
        <Link className="a-nav-component" href="/experiencia">
          <DocumentTextOutline cssClasses="ion-icon-nav-component" />
        </Link>
      </li>
      <li className="li-nav-component">
        <Link className="a-nav-component" href="/contacto">
          <ChatbubbleOutline cssClasses="ion-icon-nav-component" />
        </Link>
      </li>
      <div className="marker-nav-component" ref={marker}></div>
    </ul>
  );
}
