import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "Backend do DUOcareer funcionando!"
  });
});

export default app;