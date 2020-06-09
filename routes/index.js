const express = require("express");
const router = express.Router();
const articlesController = require("./../controllers/articlesController");
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.showHomePage);

/* GET contact page. */
router.get("/pages/contact.html", indexController.showContactPage);

/* GET single-page page. */
router.get("/home/:categorySlug/:slug", articlesController.showSingleArticle);

module.exports = router;
