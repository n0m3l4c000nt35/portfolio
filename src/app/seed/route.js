import mongoose from "mongoose";
import { connectDB } from "../../db/connect";
import { Education } from "../../models/Education";
import { educationData } from "../../db/data";

const seedDB = async () => {
  await connectDB();
  await Education.insertMany(educationData);
};

const deleteCollection = async collection => {
  await connectDB();
  mongoose.connection
    .dropCollection(collection)
    .then(() => console.log(`Colección ${collection} eliminada.`))
    .finally(() => mongoose.connection.close());
};

seedDB();

// deleteCollection("educations");
