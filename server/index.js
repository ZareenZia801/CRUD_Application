const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
// const { default: App } = require("../client/src/App");

const db = mysql.createPool({
  host: "localhost",
  user: "mysql",
  password: "mysql",
  database: "appdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  //"SELECT * FROM movie_reviews (movie_name, movie_review) VALUES (?,?)";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movie_name;
  const review = req.body.movie_review;

  const sqlInsert =
    "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?)";
  db.query(sqlInsert, [movieName, review], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:movie_name", (req, res) => {
  const name = req.params.movie_name;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movie_name = ?";

  console.log(name);

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movie_name;
  const review = req.body.movie_review;
  const sqlUpdate =
    "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?";

  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
