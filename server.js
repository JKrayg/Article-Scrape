var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

//Routes
//app.get("/scrape", function(req, res) {
    axios.get("https://phys.org/space-news/").then(function(response) {
      var $ = cheerio.load(response.data);
  
      $("div.d-flex").each(function(i, element) {
        var result = {};
  
        result.img = $(this).children().attr("href");
        console.log(result.img);

        result.title = $(this).children("h3.mb-1").text();
        console.log(result.title);

        result.description = $(this).children("p.mb-1").text();
        console.log(result.description)

        result.url = $(this).children();
  
        // Create a new Article using the `result` object built from scraping
    //     db.Article.create(result)
    //       .then(function(dbArticle) {
    //         console.log(dbArticle);
    //       })
    //       .catch(function(err) {
    //         console.log(err);
    //       });
    //   });

    //   res.send("Scrape Complete");
    });
  });





















app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });