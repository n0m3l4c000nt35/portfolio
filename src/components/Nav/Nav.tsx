"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
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

  const moveIndicator = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (marker.current) {
      marker.current.style.left = `${target.offsetLeft}px`;
      marker.current.style.width = `${target.offsetWidth}px`;
    }
  };

  const activeLink = (e: MouseEvent) => {
    if (list.current) {
      const listItems = list.current.querySelectorAll("li");
      listItems.forEach(li => li.classList.remove("active"));
      (e.currentTarget as HTMLElement).classList.add("active");
    }
  };

  useEffect(() => {
    if (list.current) {
      const listItems = list.current.querySelectorAll("li");
      listItems.forEach(li => {
        li.addEventListener("mousemove", moveIndicator);
        li.addEventListener("mouseover", activeLink);
      });
    }
  }, []);

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
