/**
 * @file File exports an inilitialization function that fills the 
 *      DB with test data. 
 * @author Vishnu Devarakonda
 */
let mongoose = require("mongoose");
const usersModel = require("../model/usersModel");
// const buddyRequestsModel = require("../model/buddyRequestsModel");
let testUsers = require("./testUserData");


const DEFAULT_DB_ENDPOINT = 'mongodb://localhost:27017';


// let usersModel = {
//     insertMany: (p1, p2) => {},
// };

// let testUser8 = {
//     userinfo: {
// 	name: "Skyler White",
// 	major: "Economics M.S.",
// 	classes: ["Managerial Economics"]
//     },
//     zoomid: "@SWhite"
// }




/**
 * Function initalizes the DB with test data. 
 * @author Vishnu Devarakonda
 * @param{endpoint} String. The end point for the database, by default assume local
 */
function initializeDB(endpoint = DEFAULT_DB_ENDPOINT){
    return usersModel.insertMany(testUsers);
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
