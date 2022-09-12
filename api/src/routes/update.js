const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const router = Router();

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, summary, score, healthScore, steps, dietTypes } = req.body;

  try {
    await Recipe.update(
      {
        name: name,
        summary: summary,
        score: score,
        healthScore: healthScore,
        steps: steps,
      },
      { where: { id: id } }
    );
    res.status(200).send("Recipes updated");
    return res.status(200).send("Modificacion realizada en Dogs");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
