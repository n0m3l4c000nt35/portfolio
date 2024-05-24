import NavLink from "./nav-link";

const links = [
  { id: 1, href: "/", title: "Home" },
  { id: 2, href: "/educacion", title: "Educación" },
  { id: 3, href: "/proyectos", title: "Proyectos" },
  { id: 4, href: "/experiencia", title: "Experiencia" },
  { id: 5, href: "/contacto", title: "Contacto" },
];

export default function Navbar() {
  return (
    <nav className="flex justify-center">
      {links.map(({ id, href, title }) => (
        <NavLink key={id} href={href} title={title} />
      ))}
    </nav>
  );
}
