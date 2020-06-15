const express = require("express");
const router = express.Router();
const articlesController = require("./../controllers/articlesController");
const indexController = require("../controllers/indexController");
const categoriesController = require("../controllers/categoriesController");

/* GET home page. */
router.get("/", indexController.showHomePage);

/* GET contact page. */
router.get("/pages/contact.html", indexController.showContactPage);

/* GET single-page page. */
router.get(
  "/home/:categorySlug/:slug",
  articlesController.showSingleArticlePage
);

/* GET a page that shows list article of a single category . */
router.get("/home/:categorySlug", categoriesController.showCategoryPage);

module.exports = router;
