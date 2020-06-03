var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET contact page. */
router.get("/pages/contact.html", function (req, res, next) {
  res.render("pages/contact.ejs", { title: "Express" });
});

/* GET single-page page. */
router.get("/pages/single_page.html", function (req, res, next) {
  res.render("pages/single-page.ejs", { title: "Express" });
});

/* GET single-page page. */
router.get("/single_page.html", function (req, res, next) {
  res.render("pages/single-page.ejs", { title: "Express" });
});

module.exports = router;
