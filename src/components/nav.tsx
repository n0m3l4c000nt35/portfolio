import NavLink from "./nav-link";

const links = [
  { id: 1, href: "/", title: "Inicio" },
  { id: 2, href: "/educacion", title: "Educación" },
  { id: 3, href: "/habilidades", title: "Habilidades" },
  { id: 4, href: "/proyectos", title: "Proyectos" },
  { id: 5, href: "/experiencia", title: "Experiencia" },
  { id: 6, href: "/contacto", title: "Contacto" },
  { id: 7, href: "/blog", title: "Blog" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 backdrop-blur flex justify-center p-2 rounded-lg nav-shadow">
      {links.map(({ id, href, title }) => (
        <NavLink key={id} href={href} title={title} />
      ))}
    </nav>
  );
}
