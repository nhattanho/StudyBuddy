/**
 * @file File exports an inilitialization function that fills the 
 *      DB with test data. 
 * @author Vishnu Devarakonda
 */
let mongoose = require("mongoose");
const usersModel = require("../model/usersModel");
const buddyRequestsModel = require("../model/buddyRequestsModel");
// import usersModel from "../model/usersModel";
// import buddyRequestsModel from "../model/buddyRequestsModel";
const testUsers = require("./testUserData");
// import testUsers from "./testUserData.js";

/**
 * Function initalizes the DB with test data. 
 * @author Vishnu Devarakonda
 */
function initializeDB(){
    mongoose.connect('mongodb://localhost:8008');
    usersModel.insertMany(testUsers, function(err, data){
	if (err) throw err;
    });
}

module.export = initializeDB;
