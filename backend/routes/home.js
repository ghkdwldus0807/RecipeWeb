const express = require("express");
const router = express.Router();
//var app = express();
const renderer = require("vue-server-renderer").createRenderer();
var path = require("path");

router.use(express.static(path.join(__dirname, "dist")));

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

const homeVue = `
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
`;

// Vue 컴포넌트를 렌더링하는 라우터 핸들러
router.get("/", (req, res) => {
  const context = {
    title: "Express with Vue",
    message: "Welcome to Vue on the server side!",
  };

  renderer.renderToString({ template: homeVue, data: context }, (err, html) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    res.render("index", { html });
  });
});

module.exports = router;
module.exports = homeVue;
