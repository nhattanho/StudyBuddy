// This file build the buddy requests collections for BB
// By: Vishnu Devarakonda

DB_NAME = "studybuddy"

conn = new Mongo();
db = conn.getDB(DB_NAME);


db.createCollection("buddyrequests", {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    required: [
		"requestId",
		"sender",
		"receiver",
		"status",
		"dateslots"
	    ],
	    properties: {
		requestId: {
		    bsonType: "objectid",
		    description: "The request id",
		},
		sender: {
		    bsonType: "objectid",
		    description: "userid for the user making the sending the request.",
		},
		receiver: {
		    bsonType: "objectid",
		    description: "userid for the user getting the request.",
		},
		status: {
		    enum: [
			"Accepted",
			"Pending",
			"Cancelled"
		    ],
		    description: "Determines the status of the request"
		}
		dateslots: {
		    bsonType: "array",
		    items: {
			bsonType: "timestamp"
			description: "Timestamp for possible meeting time"
		    },
		    description: "List of possible timestamps for meeting time"
		}
	    }
	}
    }
});
		    
