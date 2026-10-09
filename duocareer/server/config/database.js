import mongoose from "mongoose";

async function connectDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("A variável MONGO_URI não está definida no arquivo .env.");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
}

export default connectDatabase;