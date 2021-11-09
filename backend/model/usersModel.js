// File loads the users model
// By: Vishnu Devarakonda
var mongoose = require('mongoose');
const DB = require("./DBconsts");

/**
 * Schema for past buddies
 */
const pastBuddySchema = new mongoose.Schema({
    _id: {type: mongoose.ObjectId, required: true},
    name: {type: String, required: true},
    profileURL: {type: String, required: true}
})

/**
 * Schema for second user in request
 */
const secondUserSchema = new mongoose.Schema({
    _id: {type: mongoose.ObjectId, required: true},
    name: {type: String, required: true},
    profileURL: {type: String, required: true}
})

/**
 * User's buddy request schema
 */
const userBuddyRequestSchema = new mongoose.Schema({
    _id: {type: mongoose.ObjectId, required: true},
    status: {
        type: String,
	    enum: ["Accepted", "Pending", "Cancelled"],
        required: true
    },
    userOwner: {
        type: Boolean,
        required: true
    },
    secondUser: {
        type: secondUserSchema,
        required: true
    }
})
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    major: {type: String, required: true},
    classes: {
        type: [String],
        minLength: 1,
        required: true
    },
    profileURL: {type: String, required: false},
    zoomid: { type: String, required: true},
    pastbuddies: { type: [pastBuddySchema] },
    buddyrequests: { type: [userBuddyRequestSchema] }
});


module.exports = mongoose.model(DB.collections.users.name, userSchema);
