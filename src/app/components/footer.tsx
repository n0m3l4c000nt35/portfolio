import { ReactElement } from "react";
import {
  FaLinkedin,
  FaGithubSquare,
  FaWhatsappSquare,
  FaMailBulk,
} from "react-icons/fa";

type FooterLink = {
  id: number;
  icon: ReactElement;
  href: string;
  title: string;
};

const links: FooterLink[] = [
  {
    id: 1,
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/esteban-zarate/",
    title: "Perfil de LinkedIn",
  },
  {
    id: 2,
    icon: <FaGithubSquare />,
    href: "https://github.com/n0m3l4c000nt35",
    title: "Perfil de Github",
  },
  {
    id: 3,
    icon: <FaWhatsappSquare />,
    href: "https://wa.me/+541122771652",
    title: "Enviar Whatsapp",
  },
  {
    id: 4,
    icon: <FaMailBulk />,
    href: "mailto:estebanluiszarate1985@gmail.com",
    title: "Enviar correo electrónico",
  },
];

export default function Footer() {
  return (
    <footer>
      {links.map(({ id, icon, href, title }) => (
        <a key={id} href={href} target="_blank" title={title}>
          {icon}
        </a>
      ))}
    </footer>
  );
}
