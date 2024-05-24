import Image from "next/image";

type Certificate = {
  id: number;
  title: string;
  url: string;
};

type Study = {
  id: number;
  title: string;
  school: string;
  description: string[];
  certificates: Certificate[];
  details: string;
};

const studies: Study[] = [
  {
    id: 1,
    title: "Licenciatura en Tecnologías de la Información",
    school: "Ensign College",
    description: ["PC Hardware Technician", "Python Scripting"],
    certificates: [
      {
        id: 1,
        title: "TestOut Client Pro",
        url: "https://certification.testout.com/managecert?certificateID=6-2C6-VDRGFS",
      },
      {
        id: 2,
        title: "TestOut PC Pro",
        url: "https://certification.testout.com/verifycert/6-2C6-VCVKXT",
      },
    ],
    details:
      "https://www.byupathway.edu/bachelors-degree/information-technology",
  },
  {
    id: 2,
    title: "Desarrollo de aplicaciones",
    school: "Coderhouse",
    description: ["React Native", "Expo"],
    certificates: [],
    details: "https://www.coderhouse.com/ar/online/desarrollo-aplicaciones",
  },
  {
    id: 3,
    title: "Python",
    school: "Coderhouse",
    description: ["Django"],
    certificates: [],
    details: "https://www.coderhouse.com/ar/online/python",
  },
  {
    id: 4,
    title: "Desarrollo Backend",
    school: "Coderhouse",
    description: ["NodeJS", "ExpressJS", "Motores de plantillas", "MongoDB"],
    certificates: [],
    details: "https://www.coderhouse.com/ar/online/carrera-desarrollo-backend",
  },
  {
    id: 5,
    title: "React JS",
    school: "Coderhouse",
    description: [],
    certificates: [
      {
        id: 1,
        title: "React Js",
        url: "https://www.coderhouse.com/ar/certificados/622542c9fbd8de0024d6e456",
      },
    ],
    details: "https://www.coderhouse.com/ar/online/reactjs",
  },
  {
    id: 6,
    title: "Javascript",
    school: "Coderhouse",
    description: [],
    certificates: [
      {
        id: 1,
        title: "JavaScript",
        url: "https://www.coderhouse.com/ar/certificados/62b5b172b0ad99001b533e1b",
      },
    ],
    details: "https://www.coderhouse.com/ar/online/javascript",
  },
  {
    id: 7,
    title: "Desarrollo Web",
    school: "Coderhouse",
    description: [],
    certificates: [
      {
        id: 1,
        title: "Desarrollo Web",
        url: "https://www.coderhouse.com/ar/certificados/61bca0a24e461300347cf1ab",
      },
    ],
    details: "https://www.coderhouse.com/ar/online/desarrollo-web-online",
  },
];

export default function Education() {
  return (
    <>
      {/* <h1 className="page-title">Educación</h1> */}
      <ul className="text-center">
        {studies.map(
          ({ id, title, school, description, certificates, details }) => (
            <li
              key={id}
              className="mb-4 border-transparent border-[1px] pb-2 hover:border-[1px] hover:border-gray-900"
            >
              <h2 className="pt-1 px-3 pb-1 text-xl bg-gray-900 text-gray-300">
                {title}
              </h2>
              <div className="px-3">
                <h3 className="my-1 text-left text-[12px] font-bold uppercase">
                  {school}
                </h3>
                <ul>
                  {description?.map((item, index) => (
                    <li key={index} className="text-left text-sm">
                      <b>&nbsp; - </b>
                      <span className="italic">{item}</span>
                    </li>
                  ))}
                </ul>
                {certificates.length > 0 && (
                  <div>
                    <h3 className="text-left font-bold text-[14px]">
                      Certificado{certificates.length > 1 && <span>s</span>}
                    </h3>
                    <ul className="text-left">
                      {certificates?.map(({ id, title, url }) => (
                        <li key={id}>
                          <a className="text-sm" href={url}>
                            {title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex">
                  <a
                    href={details}
                    target="_blank"
                    className="mx-auto border rounded-lg my-1 px-2 py-1 bg-slate-800 text-neutral-200 hover:bg-slate-700 text-sm"
                    title="Ver detalles del estudio"
                  >
                    Detalles
                  </a>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
}
