type Study = {
  id: number;
  title: string;
  school: string;
  description: string[];
  link: string;
};

const studies: Study[] = [
  {
    id: 1,
    title: "Licenciatura en Tecnologías de la Información",
    school: "Ensign College",
    description: ["PC Hardware Technician", "Python Scripting"],
    link: "https://www.byupathway.edu/bachelors-degree/information-technology",
  },
  {
    id: 2,
    title: "Desarrollo de aplicaciones",
    school: "Coderhouse",
    description: ["React Native", "Expo"],
    link: "https://www.coderhouse.com/ar/online/desarrollo-aplicaciones",
  },
  {
    id: 3,
    title: "Python",
    school: "Coderhouse",
    description: ["Django"],
    link: "https://www.coderhouse.com/ar/online/python",
  },
  {
    id: 4,
    title: "Desarrollo Backend",
    school: "Coderhouse",
    description: ["NodeJS", "ExpressJS", "Motores de plantillas", "MongoDB"],
    link: "https://www.coderhouse.com/ar/online/carrera-desarrollo-backend",
  },
  {
    id: 5,
    title: "React JS",
    school: "Coderhouse",
    description: [],
    link: "https://www.coderhouse.com/ar/online/reactjs",
  },
  {
    id: 6,
    title: "Javascript",
    school: "Coderhouse",
    description: [],
    link: "https://www.coderhouse.com/ar/online/javascript",
  },
  {
    id: 7,
    title: "Desarrollo Web",
    school: "Coderhouse",
    description: [],
    link: "https://www.coderhouse.com/ar/online/desarrollo-web-online",
  },
];

export default function Education() {
  return (
    <>
      <h1 className="page-title">Educación</h1>
      <ul>
        {studies.map(({ id, title, school, description, link }) => (
          <li key={id}>
            <h3>{title}</h3>
            <h2 className="font-bold text-sm uppercase">{school}</h2>
            <ul>
              {description?.map((item, index) => (
                <li key={index} className="text-sm">
                  <b>&nbsp; - </b>
                  <span className="italic">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex">
              <a
                href={link}
                target="_blank"
                className="border rounded-lg my-1 px-2 py-1 bg-slate-800 text-neutral-200 hover:bg-slate-700 text-sm"
              >
                Detalles
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
