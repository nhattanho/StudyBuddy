<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const buddyrequest = require("./routes/buddyrequest.js");
=======
/* =======================================================================*/
/**
* This is a driver for backend side
* @author NhatHo
*/
/* =======================================================================*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user.js");
>>>>>>> master

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
<<<<<<< HEAD
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
=======
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
>>>>>>> master
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST, GET");
  res.header(
    "Access-Control-Allow-Headers",
    // "Origin, X-Requested-With, Content-Type, Accept"
    "Origin, Content-Type"
  );
  next();
<<<<<<< HEAD
  // if ("OPTIONS" == req.method) {
  //   res.sendStatus(200);
  // } else {
  //   next();
  // }
=======
>>>>>>> master
});

/* Create and connect to DB */
mongoose.connect(
<<<<<<< HEAD
  "mongodb+srv://bruin:12345@cluster0.comie.mongodb.net/bruin?retryWrites=true&w=majority",
=======
  process.env.DATABASE_ACCESS,
>>>>>>> master
  () => console.log("Database connected"),
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to db");
});
<<<<<<< HEAD
app.use("/buddyrequest", buddyrequest);

/* Listening on Port */
const port = 5000;
=======
app.use("/user", user);
/* Listening on Port */
const port = process.env.PORT || 5000;
>>>>>>> master
app.listen(port, () => console.log("listening at port", port));