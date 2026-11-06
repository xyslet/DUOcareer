import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API do DUOcareer funcionando!",
    version: "0.2",
  });
});

export default router;