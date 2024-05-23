import Link from "next/link";

export default function NavLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      className="mx-2 px-3 py-1 rounded-lg border hover:border-slate-300"
      href={`${href}`}
    >
      {title}
    </Link>
  );
}
