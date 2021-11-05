/**
 * @file File exports an inilitialization function that fills the 
 *      DB with test data. 
 * @author Vishnu Devarakonda
 */

import usersModel from "../model/usersModel";
import buddyRequestsModel from "../model/buddyRequestsModel";

/**
 * Function initalizes the DB with test data. 
 * @author Vishnu Devarakonda
 */
export default function(){
    usersModel.insertMany();
    buddyRequestsModel.insertMany();
}