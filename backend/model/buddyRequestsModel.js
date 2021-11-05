/**
 * @file Creates schema for buddyrequests collection and exports 
 *       the mongoose model.
 * @author Vishnu Devarakonda 
 */
var mongoose = require("mongoose");

const buddyRequestSchema = new Schema({
    sender: { type: ObjectId, required: true},
    receiver: { type: ObjectId, required: true},
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


model.export = mongoose.model("buddyrequests", buddyRequestSchema);
