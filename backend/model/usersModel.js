/**
 * @file Creates schema for users collection and exports the mongoose model.
 * @author Vishnu Devarakonda 
 */
var mongoose = require('mongoose');
const DB = require("./DBconsts");
const classes = require("./classes")
const majors = require("./majors")
const classIDs = classes.map((val, i) => val.id)

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
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
  
    /*Added by Nhat Ho*/
    username: {type: String, required: true},
    checkLogin: {type: String, required: true},
    password: { type: String },
    confirm_password: { type: String },
    checkLogin: {type: Boolean},
    /* End of adding*/
  
    about: {type: String, required: false},
    birthday: {type: Date},
    major: {
        type: String,
        enum: Object.values(majors).map((item, i) => item.name),
        required: false
    },
    year: {
        type: String,
        enum: [
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior',
            'Graduate',
            'Ph.D'
        ],
        required: false
    },
    classes: {
        type: [String],
        enum: classIDs,
        minLength: 1,
        required: false
    },
    profileURL: {type: String, required: false},
    zoomid: { type: String, required: false},
    pastbuddies: { type: [pastBuddySchema] },
    buddyrequests: { type: [userBuddyRequestSchema] },
    resetPasswordToken: {type: String, required: false},
    resetPasswordExpires: {type: Date, required: false},
});


module.exports = mongoose.model(DB.collections.User.name, userSchema);
