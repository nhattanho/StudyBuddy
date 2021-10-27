// This file builds the user collections for DB
// By: Vishnu Devarakonda
load("./globals.js");

conn = new Mongo()
db = conn.getDB(DB_NAME);


db.createCollection("users", {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    required: [
		"userinfo",
		"zoomid"
	    ],
	    properties: {
		userinfo: {
		    bsonType: "object",
		    required: [
			"name",
			"major",
			"classes"
		    ],
		    properties: {
			name: {
			    bsonType: "string",
			    description: "User's name. Required"
			},
			major: {
			    bsonType: "string",
			    description: "User's major. Required"
			},
			classes: {
			    bsonType: "array",
			    minItems: 1,
			    uniqueItems: true,
			    additionalProperties: false,
			    items: {
				bsonType: "string",
				description: "User's class"
			    }
			}
		    }
		},
		userid: {
		    bsonType: "objectId",
		    description: "Unique user id."
		},
		zoomid: {
		    bsonType: "string",
		    description: "User's zoom id."
		},
		pastbuddies: {
		    bsonType: "array",
		    items: {
			bsonType: "objectId",
			description: "The user id of users who were past buddies"
		    },
		    description: "Contains past buddies the user has interacted with."
		},
		buddyrequests: {
		    bsonType: "array",
		    items: {
			bsonType: "objectId",
			description: "Reference to object in requests table"
		    },
		    description: "Contains references to current pending, accepton, and past requests for the user"
		}
	    }
	}
    }
});
