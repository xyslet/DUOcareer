import express from "express";
import cors from "cors";

import statusRoutes from "./routes/statusRoutes.js";
import trailRoutes from "./routes/trailRoutes.js";
import pointRoutes from "./routes/pointRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/status", statusRoutes);
app.use("/api/trails", trailRoutes);
app.use("/api/points", pointRoutes);

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "Backend do DUOcareer funcionando!"
  });
});

export default app;