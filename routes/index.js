const express = require("express");
const router = express.Router();
const articlesController = require("./../controllers/articlesController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("default/index", { title: "Express" });
});

/* GET contact page. */
router.get("/pages/contact.html", function (req, res, next) {
  res.render("default/contact", { title: "Express" });
});

/* GET single-page page. */
// router.get("/pages/single_page.html", function (req, res, next) {
//   res.render("pages/single-page.ejs", { title: "Express" });
// });

/* GET single-page page. */
router.get("/:slug", articlesController.showSingleArticle);

module.exports = router;
