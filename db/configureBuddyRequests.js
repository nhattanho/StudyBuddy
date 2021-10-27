// This file build the buddy requests collections for BB
// By: Vishnu Devarakonda
load("./globals.js");

conn = new Mongo();
db = conn.getDB(DB_NAME);


db.createCollection(COLLECTIONS.buddyRequestsCollectionName, {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    required: [
		"requestid",
		"sender",
		"receiver",
		"status",
		"dateslots"
	    ],
	    properties: {
		requestId: {
		    bsonType: "objectId",
		    description: "The request id"
		},
		sender: {
		    bsonType: "objectId",
		    description: "userid for the user making the sending the request."
		},
		receiver: {
		    bsonType: "objectId",
		    description: "userid for the user getting the request."
		},
		status: {
		    enum: [
			"Accepted",
			"Pending",
			"Cancelled"
		    ],
		    description: "Determines the status of the request"
		},
		dateslots: {
		    bsonType: "array",
		    items: {
			bsonType: "timestamp",
			description: "Timestamp for possible meeting time"
		    },
		    description: "List of possible timestamps for meeting time"
		}
	    }
	}
    }
});
