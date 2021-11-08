// File loads the users model
// By: Vishnu Devarakonda
var mongoose = require('mongoose');
const DB = require("./DBconsts");

const pastBuddySchema = new mongoose.Schema({
    _id: {type: mongoose.ObjectId, required: true},
    name: {type: String, required: true}
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
    buddyrequests: { type: [mongoose.ObjectId] }
});


module.exports = mongoose.model(DB.collections.users.name, userSchema);
