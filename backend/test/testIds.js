/**
* @file Contains ids for users and user requests
* @author Vishnu Devarakonda
*/
const mongoose = require('mongoose');



const userRequests = {
 requestWalterJessie: mongoose.Types.ObjectId(),
 requestWalterGus: mongoose.Types.ObjectId(),
 requestWalterHank: mongoose.Types.ObjectId(),
 requestMikeWalter: mongoose.Types.ObjectId(),
 requestSkylerWalter: mongoose.Types.ObjectId(),
 requestSaulWalter: mongoose.Types.ObjectId(),
 requestJessieWalter: mongoose.Types.ObjectId(),
 requestHankJessie: mongoose.Types.ObjectId()
}

const users = {
    walter: mongoose.Types.ObjectId(),
    jessie: mongoose.Types.ObjectId(),
    gus: mongoose.Types.ObjectId(),
    hank: mongoose.Types.ObjectId(),
    mike: mongoose.Types.ObjectId(),
    todd: mongoose.Types.ObjectId(),
    saul: mongoose.Types.ObjectId(),
    skyler: mongoose.Types.ObjectId()
};




module.exports = {users, userRequests}
