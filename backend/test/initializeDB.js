/**
 * @file File exports an inilitialization function that fills the 
 *      DB with test data. 
 * @author Vishnu Devarakonda
 */
const usersModel = require("../model/usersModel");
const buddyRequestsModel = require("../model/buddyRequestsModel");
const testUsers = require("./testUserData");
const classes = require("../model/classes");
const classModel = require("../model/classModel");
const majorModel = require("../model/majorModel");
let majors = require("../model/majors");
majors = Object.values(majors);
let testBuddyRequests = require("./testBuddyRequestsData");
testBuddyRequests = Object.values(testBuddyRequests)

/**
 * Function initializes the DB with test data.
 * @author Vishnu Devarakonda
 * @returns {[Promise, Promise]} Returns a promise for inserting users
 *          and user requests into the database.
 */
function initializeDB() {
    return [
        usersModel.insertMany(testUsers),
        classModel.insertMany(classes),
        majorModel.insertMany(majors),
        buddyRequestsModel.insertMany(testBuddyRequests)
    ];
}

/**
 * Function clears the DB
 * @author Vishnu Devarakonda
 * @returns {[Promise, Promise]} Returns a promise after deleting the users
 *          and buddyrequests.
 */
function clearDB() {
    return [
        usersModel.deleteMany({}),
        classModel.deleteMany({}),
        majorModel.deleteMany({}),
        buddyRequestsModel.deleteMany({})
    ];
}

module.exports = {
    initializeDB,
    clearDB
};