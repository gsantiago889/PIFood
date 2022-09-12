const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const router = Router();

router.delete("/:id", async (req, res, next) => {
  console.log("delete recipe");

  try {
    const { id } = req.params;

    const deleteRecipe = await Recipe.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Recipes deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
