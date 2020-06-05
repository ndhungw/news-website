var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// GET articles listing
router.get("/articles", usersController.showAllArticles);

// GET new article page (R)
router.get("/articles/new", usersController.showNewArticlePage);

// GET article by id (R)
router.get("/articles/:slug", usersController.getArticle);

// POST new article form (C)
router.post("/articles", usersController.addArticle);

// DELETE a article (D)
router.delete("/articles/:id", usersController.deleteArticle);

module.exports = router;
