/**Work with Abdullahi Ali */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db, collection;
const dbName = "messages";
const url =
  `mongodb+srv://lenynzita:Charisma1@cluster0.uutofyf.mongodb.net/${dbName}?retryWrites=true&w=majority`;
//mongodb+srv://lenynzita:<password>@cluster0.uutofyf.mongodb.net/?retryWrites=true&w=majority
app.listen(5000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db();
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("messages")
    .find()
    .toArray((err, allDocuments) => {
      if (err) return console.log(err);
      res.render("index.ejs", { soccerWiki : allDocuments });
    });
});

app.post("/savePlayerInfo", (req, res) => {
  db.collection("messages").insertOne(
    { playerName: req.body.name, playerCountry: req.body.country, currentClub: req.body.club, numberGoals: req.body.goals},
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});
app.delete("/delete", (req, res) => {
  db.collection("messages").findOneAndDelete(
    { playerName: req.body.deleteName, playerCountry: req.body.deleteCountry, currentClub: req.body.deleteClub, numberGoals: req.body.deleteGoals },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});


