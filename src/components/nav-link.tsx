"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      className={`mx-2 px-3 py-1 text-lime-600 tracking-wider font-bold hover:text-lime-700	${
        pathname === href ? "nav-shadow rounded-lg" : ""
      }`}
      href={`${href}`}
    >
      {title}
    </Link>
  );
}
