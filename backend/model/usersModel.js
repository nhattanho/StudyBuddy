// File loads the users model
// By: Vishnu Devarakonda
var mongoose = require('mongoose');

const userInfoSchema = new Schema({
    name: {type: String, required: true},
    major: {type: String, required: true},
    classes: {
	type: [String],
	minLength: 1,
	required: true
    },
    profileURL: { type: String, required: false}
});

    
const userSchema = new Schema({
    userinfo: {
	type: userInfoSchema,
	required: true
    },
    zoomid: { type: String, required: true}
    pastbuddies: { type: [ObjectId] },
    buddyrequests: { type: [ObjectId] }
});


module.exports = mongoose.model("users", userSchema);
