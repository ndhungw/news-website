const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Manage articles */

// GET articles listing
router.get("/articles", usersController.showAllArticles);

// GET new article page (R)
router.get("/articles/new", usersController.showNewArticlePage);

// GET article by slug (R)
router.get("/articles/:slug", usersController.getArticle);

// POST new article form (C)
router.post("/articles", usersController.addArticle);
// router.post("/articles", usersController.saveArticleAndRedirect('new'));

// DELETE a article (D)
router.delete("/articles/:id", usersController.deleteArticle);

router.get("/articles/edit/:id", usersController.showEditArticlePage);

router.put("/articles/:id", usersController.editArticle);
// router.put("/articles/:id", usersController.saveArticleAndRedirect('edit'));

/* Manage authentication */

/* Manage categories */
router.get("/categories", usersController.showAllCategories);

module.exports = router;
