"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useBodyStyle() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/habilidades") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [pathname]);
}
