import mongoose from "mongoose";

const { NEXT_PUBLIC_MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(NEXT_PUBLIC_MONGODB_URI);
    console.log("Conexión exitosa.", { connected });
  } catch (error) {
    console.error("Error durante la conexión a la base de datos.", { error });
  }
};

export { connectDB };
