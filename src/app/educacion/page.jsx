import { fetchData } from "../lib/data";
import styles from "./page.module.css";

export default async function Education() {
  const data = await fetchData();
  console.log("Datos obtenidos en el componente:", { data });
  return (
    <section>
      {data.map(
        ({
          _id,
          title,
          startDate,
          endDate,
          institution,
          location,
          details,
        }) => {
          return (
            <div key={_id}>
              <div className={styles.title}>
                <h2>{title}</h2>
                <span>
                  {startDate} - {endDate}
                </span>
              </div>
              <div className={styles.institution}>
                <span>{institution}</span>
                <span>{location}</span>
              </div>
              <ul className={styles.details}>
                {details.map(detail => (
                  <li>{detail}</li>
                ))}
              </ul>
              <hr />
            </div>
          );
        }
      )}
    </section>
  );
}
