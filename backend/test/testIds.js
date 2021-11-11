/**
* @file Contains ids for users and user requests
* @author Vishnu Devarakonda
*/
const mongoose = require('mongoose');


// WARNING: ############
// DO NOT CHANGE THESE IDs, If you change them, it'll
// be annoying to get them again.
const userRequests = {
 requestWalterJesse: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb39"),
 requestWalterGus: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb3a"),
 requestWalterHank: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb3b"),
 requestMikeWalter: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb3c"),
 requestSkylerWalter: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb3d"),
 requestSaulWalter: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb3e"),
 requestJesseWalter: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb3f"),
 requestHankJesse: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb40")
}

const users = {
    walter: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb21"),
    jesse: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb22"),
    gus: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb23"),
    hank: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb24"),
    mike: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb25"),
    todd: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb26"),
    saul: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb27"),
    skyler: mongoose.mongo.ObjectId("61882ca2ecd1b1934636eb28")
};

module.exports = {users, userRequests}