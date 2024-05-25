import NavLink from "./nav-link";

const links = [
  { id: 1, href: "/", title: "Inicio" },
  { id: 2, href: "/educacion", title: "Educación" },
  { id: 3, href: "/habilidades", title: "Habilidades" },
  { id: 4, href: "/proyectos", title: "Proyectos" },
  { id: 5, href: "/experiencia", title: "Experiencia" },
  { id: 6, href: "/contacto", title: "Contacto" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-center bg-white p-2">
      {links.map(({ id, href, title }) => (
        <NavLink key={id} href={href} title={title} />
      ))}
    </nav>
  );
}
