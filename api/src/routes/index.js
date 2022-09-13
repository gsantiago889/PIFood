const { Router } = require("express");

const recipesRouter = require("./recipes");
const typesRouter = require("./types");
const recipeRouter = require("./recipe");
const recipeDelete = require("./delete");
const recipeUdate = require("./update");

const router = Router();

// Configuración de rutas
router.use("/recipes", recipesRouter);
router.use("/types", typesRouter);
router.use("/recipe", recipeRouter);
router.use("/delete", recipeDelete);
router.use("/update", recipeUdate);

module.exports = router;
