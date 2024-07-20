import {
  HomeOutline,
  SchoolOutline,
  BuildOutline,
  BriefcaseOutline,
  DocumentTextOutline,
  ChatbubbleOutline,
  LibraryOutline,
} from "react-ionicons";

import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaLinux,
  FaPython,
} from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { SiMongodb, SiGnubash } from "react-icons/si";

const navbarLinks = [
  {
    id: 1,
    href: "/",
    icon: <HomeOutline cssClasses="ion-icon-nav-component" />,
  },
  {
    id: 2,
    href: "/educacion",
    icon: <SchoolOutline cssClasses="ion-icon-nav-component" />,
  },
  {
    id: 3,
    href: "/habilidades",
    icon: <BuildOutline cssClasses="ion-icon-nav-component" />,
  },
  {
    id: 4,
    href: "/proyectos",
    icon: <BriefcaseOutline cssClasses="ion-icon-nav-component" />,
  },
  {
    id: 5,
    href: "/experiencia",
    icon: <DocumentTextOutline cssClasses="ion-icon-nav-component" />,
  },
  {
    id: 6,
    href: "/contacto",
    icon: <ChatbubbleOutline cssClasses="ion-icon-nav-component" />,
  },
  {
    id: 7,
    href: "https://n0m3l4c000nt35.vercel.app/",
    icon: <LibraryOutline cssClasses="ion-icon-nav-component" />,
  },
];

const links = [
  {
    id: 1,
    title: "HTML",
    icon: <FaHtml5 className="size-16" />,
    color: "#E34F26",
  },
  {
    id: 2,
    title: "CSS",
    icon: <FaCss3Alt className="size-16" />,
    color: "#1572B6",
  },
  {
    id: 3,
    title: "JavaScript",
    icon: <IoLogoJavascript className="size-16" />,
    color: "#F7DF1E",
  },
  {
    id: 4,
    title: "REACT",
    icon: <FaReact className="size-16" />,
    color: "#61DAFB",
  },
  {
    id: 5,
    title: "NODE",
    icon: <FaNodeJs className="size-16" />,
    color: "#339933",
  },
  {
    id: 6,
    title: "MONGO",
    icon: <SiMongodb className="size-16" />,
    color: "#47A248",
  },
  {
    id: 7,
    title: "LINUX",
    icon: <FaLinux className="size-16" />,
    color: "#FCC624",
  },
  {
    id: 8,
    title: "PYTHON",
    icon: <FaPython className="size-16" />,
    color: "#3776AB",
  },
  {
    id: 9,
    title: "BASH",
    icon: <SiGnubash className="size-16" />,
    color: "#4EAA25",
  },
];

export { navbarLinks, links };
