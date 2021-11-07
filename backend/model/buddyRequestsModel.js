// File loads the buddyrequestmodel
// By: Vishnu Devarakonda
var mongoose = require("mongoose");
const DB = require("./DBconsts");

const buddyRequestSchema = new mongoose.Schema({
    sender: { type: mongoose.ObjectId, required: true},
    receiver: { type: mongoose.ObjectId, required: true},
    status: {
        type: String,
	    enum: ["Accepted", "Pending", "Cancelled"],
    	required: true
    },
    dateslots: {
	    type: [Date],
	    minItems: 1,
	    required: true
    }
});


module.exports = mongoose.model(DB.collections.buddyrequests.name,
     buddyRequestSchema);
