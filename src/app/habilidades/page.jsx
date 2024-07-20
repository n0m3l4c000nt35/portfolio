"use client";

import React, { useEffect, useRef } from "react";
import { links } from "../lib/utils";

export default function Skills() {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;

    function moveNext() {
      const items = box.querySelectorAll(".item");
      box.appendChild(items[0]);
    }

    function movePrev() {
      const items = box.querySelectorAll(".item");
      box.prepend(items[items.length - 1]);
    }

    function handleWheel(event) {
      if (event.deltaY > 0) {
        moveNext();
      } else {
        movePrev();
      }
    }

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const items = [...Array(3)].flatMap((_, repeatIndex) =>
    links.map((link, index) => (
      <div
        key={`${link.id}-${repeatIndex}`}
        className="item"
        style={{ "--item-color": link.color }}
        data-text={link.title}
      >
        {link.icon}
      </div>
    ))
  );

  return (
    <section className="section-skills">
      <div className="box" ref={boxRef}>
        {items}
      </div>
    </section>
  );
}
