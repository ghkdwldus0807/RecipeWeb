const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  getDetail,
  createRecipe,
  editRecipe,
  deleteRecipe,
} = require("../controller/postController");

router.get("/board", getAllRecipes);

router.get("/board/:_post_id", getDetail);

router.post("/create", createRecipe);

router.put("/board/edit/:_post_id", editRecipe);

router.delete("/board/delete/:_post_id", deleteRecipe);

module.exports = router;
