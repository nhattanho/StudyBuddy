/* =======================================================================*/
/**
* This is a driver for backend side
* @author NhatHo
*/
/* =======================================================================*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const user = require("./routes/user.js");
const major = require("./routes/major.js");
const classes = require("./routes/classes.js");
const buddyrequest = require("./routes/buddyrequest.js");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST, GET");
  res.header(
    "Access-Control-Allow-Headers",
    // "Origin, X-Requested-With, Content-Type, Accept"
    "Origin, Content-Type"
  );
  next();
});

/* Create and connect to DB */
mongoose.connect(
    process.env.DATABASE_ACCESS,
    () => console.log("Database connected"),
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to db");
});
app.use("/user", user);
app.use("/major", major);
app.use("/classes", classes);
app.use("/buddyrequest", buddyrequest);
/* Listening on Port */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening at port", port));