// File loads the users model
// By: Vishnu Devarakonda
var mongoose = require('mongoose');
const DB = require("./DBconsts");



const userInfoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    major: {type: String, required: true},
    classes: {
        type: [String],
        minLength: 1,
        required: true
    },
    profileURL: { type: String, required: false}
});

    
const userSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    userinfo: {
        type: userInfoSchema,
        required: true
    },
    zoomid: { type: String, required: true},
    pastbuddies: { type: [mongoose.ObjectId] },
    buddyrequests: { type: [mongoose.ObjectId] }
});


module.exports = mongoose.model(DB.collections.users.name, userSchema);
