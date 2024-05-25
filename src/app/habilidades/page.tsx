import Image from "next/image";
import { ReactElement } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaLinux,
  FaPython,
} from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";

type Skill = {
  id: number;
  title: string;
  icon: ReactElement;
};

const links: Skill[] = [
  {
    id: 1,
    title: "HTML",
    icon: <FaHtml5 className="size-20" />,
  },
  {
    id: 2,
    title: "CSS",
    icon: <FaCss3Alt className="size-20" />,
  },
  {
    id: 3,
    title: "JS",
    icon: <IoLogoJavascript className="size-20" />,
  },
  {
    id: 4,
    title: "REACT",
    icon: <FaReact className="size-20" />,
  },
  {
    id: 5,
    title: "NODE",
    icon: <FaNodeJs className="size-20" />,
  },
  {
    id: 6,
    title: "MONGO",
    icon: <SiMongodb className="size-20" />,
  },
  {
    id: 7,
    title: "LINUX",
    icon: <FaLinux className="size-20" />,
  },
  {
    id: 8,
    title: "PYTHON",
    icon: <FaPython className="size-20" />,
  },
];

export default function Skills() {
  return (
    <section className="pt-20 grid grid-cols-4 gap-4">
      {links.map(({ id, title, icon }) => (
        <div
          key={id}
          className="flex flex-row border-[1px] border-gray-900 rounded-md"
        >
          <h2 className="cursor-pointer rounded-l-md border-r-[1px] border-gray-900 p-2 bg-gray-900 text-gray-300 text-sm text-up text-center -tracking-[2px] hover:text-gray-900 hover:bg-gray-50 hover:border-r-[1px] hover:border-gray-900">
            {title}
          </h2>
          <div className="flex grow justify-center	items-center p-4">{icon}</div>
        </div>
      ))}
    </section>
  );
}
