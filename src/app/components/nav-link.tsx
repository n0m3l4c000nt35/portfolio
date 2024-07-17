"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface NavLinkProps {
  href: string;
  title: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavLink({ href, title, setIsOpen }: NavLinkProps) {
  const pathname = usePathname();

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <Link
      className={`p-1 md:mx-2 md:px-3 md:py-1 text-lg text-lime-600 tracking-wider font-bold hover:text-lime-800 ${
        pathname === href ? "nav-shadow rounded-lg" : ""
      }`}
      href={href}
      onClick={handleClick}
    >
      {title}
    </Link>
  );
}
