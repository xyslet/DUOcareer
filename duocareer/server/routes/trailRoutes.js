import { Router } from "express";

const router = Router();

const trails = [
  {
    id: 1,
    title: "Introdução",
    description: "Conhecimentos iniciais para desenvolver sua carreira.",
    category: "Introdução",
    order: 1,
  },
  {
    id: 2,
    title: "Currículo",
    description: "Aprenda a estruturar e melhorar seu currículo.",
    category: "Currículo",
    order: 2,
  },
  {
    id: 3,
    title: "Entrevista",
    description: "Prepare-se para processos seletivos.",
    category: "Entrevista",
    order: 3,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: trails,
  });
});

router.get("/:id", (req, res) => {
  const trailId = Number(req.params.id);

  const trail = trails.find((item) => item.id === trailId);

  if (!trail) {
    return res.status(404).json({
      success: false,
      message: "Trilha não encontrada.",
    });
  }

  return res.status(200).json({
    success: true,
    data: trail,
  });
});

export default router;