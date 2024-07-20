import { connectDB } from "../../db/connect";
import { Education } from "../../models/Education";

export const fetchData = async () => {
  connectDB();
  const data = Education.find();
  console.log("Acá están los datos:", { data });
  return data;
};
