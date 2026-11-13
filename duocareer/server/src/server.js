
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares gerais
app.use(cors());
app.use(express.json());

// Rota inicial para verificar o servidor
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "API DUOcareer funcionando!",
    version: "0.2"
  });
});

// Inicialização
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
