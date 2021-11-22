/**
 * @file File inits DB with test data.
 * @author Vishnu Devarakonda
 */

const usersModel = require("./model/usersModel");
const buddyRequestsModel = require("./model/buddyRequestsModel");
const testUsers = require("./test/testUserData");
const classes = require("./model/classes");
const classModel = require("./model/classModel");
const majorModel = require("./model/majorModel");
const DB = require("./model/DBconsts");
const mongoose = require("mongoose");
let majors = require("./model/majors");
majors = Object.values(majors);
let testBuddyRequests = require("./test/testBuddyRequestsData");
testBuddyRequests = Object.values(testBuddyRequests);

/**
 * IIFE Function initializes the DB with test data.
 * @author Vishnu Devarakonda
 * @returns None.
 */
(async function initializeDB() {
    const connectParams = {
        dbName: DB.name
    };
    mongoose.connect(
        DB.DEFAULT_DB_ENDPOINT,
        connectParams,
        () => console.log("Database connected"),
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    );
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("connected to db");
      usersModel.insertMany(testUsers).then(
          (param) => {console.log("Users Inserted")}).catch((err) => {
              console.log(err);
          })
      classModel.insertMany(classes).then(
          (param) => {console.log("Classes Inserted")}).catch((err) => {
              console.log(err);
          })
      majorModel.insertMany(majors).then(
          (param) => {console.log("Majors Inserted")}).catch((err) => {
              console.log(err);
          })
      buddyRequestsModel.insertMany(testBuddyRequests).then(
          (param) => {console.log("Buddy Requests Inserted")}).catch((err) => {
              console.log(err);
          })
    });
})();