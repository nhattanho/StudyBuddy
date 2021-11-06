/**
 * @file File exports an inilitialization function that fills the 
 *      DB with test data. 
 * @author Vishnu Devarakonda
 */
let mongoose = require("mongoose");
const usersModel = require("../model/usersModel");
const buddyRequestsModel = require("../model/buddyRequestsModel");
const testUsers = require("./testUserData");
const testBuddyRequests = require("./testBuddyRequestsData");

const DEFAULT_DB_ENDPOINT = 'mongodb://localhost:27017';

/**
 * Function initalizes the DB with test data. 
 * @author Vishnu Devarakonda
 * @param{endpoint} String. The end point for the database, by default assume local
 */
function initializeDB(endpoint = DEFAULT_DB_ENDPOINT){
    return [
	usersModel.insertMany(testUsers),
	buddyRequestsModel.insertMany(testBuddyRequests)
    ];
}

/**
* Function clears the DB
* @author Vishnu Devarakonda
* @param{endpoint} String. The end point for the database, by default assume local
*/
function clearDB(endpoint = DEFAULT_DB_ENDPOINT){
    usersModel.remove({}, function(err, data){
	if (err) throw err;
    });
    // mongoose.connection.close();
}

module.exports = {initializeDB, clearDB, DEFAULT_DB_ENDPOINT};
