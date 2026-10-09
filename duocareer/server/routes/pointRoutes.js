import { Router } from "express";

const router = Router();

const points = [
  {
    id: 1,
    trailId: 1,
    title: "Conhecendo o mercado de trabalho",
    description: "Aprenda conceitos básicos sobre carreira profissional.",
    order: 1,
    xpReward: 10,
  },
  {
    id: 2,
    trailId: 1,
    title: "Identificando seus objetivos",
    description: "Reflita sobre seus interesses profissionais.",
    order: 2,
    xpReward: 10,
  },
  {
    id: 3,
    trailId: 2,
    title: "Estrutura de um currículo",
    description: "Conheça as principais partes de um currículo.",
    order: 1,
    xpReward: 15,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: points,
  });
});

router.get("/:id", (req, res) => {
  const pointId = Number(req.params.id);

  const point = points.find((item) => item.id === pointId);

  if (!point) {
    return res.status(404).json({
      success: false,
      message: "Ponto não encontrado.",
    });
  }

  return res.status(200).json({
    success: true,
    data: point,
  });
});

router.get("/trail/:trailId", (req, res) => {
  const trailId = Number(req.params.trailId);

  const trailPoints = points.filter(
    (item) => item.trailId === trailId
  );

  return res.status(200).json({
    success: true,
    data: trailPoints,
  });
});

export default router;