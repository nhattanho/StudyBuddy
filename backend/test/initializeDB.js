/**
 * @file File exports an inilitialization function that fills the 
 *      DB with test data. 
 * @author Vishnu Devarakonda
 */
const usersModel = require("../model/usersModel");
const buddyRequestsModel = require("../model/buddyRequestsModel");
const testUsers = require("./testUserData");
const testBuddyRequests = require("./testBuddyRequestsData");


/**
 * Function initalizes the DB with test data. 
 * @author Vishnu Devarakonda
 */
function initializeDB(){
    return [
	usersModel.insertMany(testUsers),
	buddyRequestsModel.insertMany(testBuddyRequests)
    ];
}

/**
* Function clears the DB
* @author Vishnu Devarakonda
*/
function clearDB(){
    return [
        usersModel.deleteMany({}),
        buddyRequestsModel.deleteMany({})
    ]
}

module.exports = {initializeDB, clearDB};
