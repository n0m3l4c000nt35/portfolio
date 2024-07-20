"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navbarLinks } from "../../lib/utils";

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
      const currentIndex = navbarLinks.findIndex(
        link => link.href === pathname
      );
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
    <header className="main-header">
      <ul className="ul-nav-component" ref={list}>
        {navbarLinks.map(({ id, icon, href }) => (
          <li key={id} className="li-nav-component">
            <Link className="a-nav-component" href={href}>
              {icon}
            </Link>
          </li>
        ))}
        <div className="marker-nav-component" ref={marker}></div>
      </ul>
    </header>
  );
}
