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
        () => console.log("Database connected"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    );
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("connected to db");
    });
    try {
        console.log("Dropping users")
        await usersModel.deleteMany({
            _id: {
                $in: testUsers.map((item, id) => item._id)
            }
        });
        await usersModel.insertMany(testUsers);
        console.log("Users Inserted")

        console.log("Dropping Classes")
        await classModel.deleteMany({});
        await classModel.insertMany(classes);
        console.log("Classes Inserted")

        console.log("Dropping Majors")
        await majorModel.deleteMany({});
        await majorModel.insertMany(majors);
        console.log("Majors Inserted")

        console.log("Dropping buddyrequests")
        await buddyRequestsModel.deleteMany({});
        await buddyRequestsModel.insertMany(testBuddyRequests);
        console.log("buddyrequests Inserted")
    } catch (err) {
        mongoose.disconnect();
        throw new Error(err);
    }
    mongoose.disconnect();
})();