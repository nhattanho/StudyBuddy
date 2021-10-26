// This file builds the user collections for DB
// By: Vishnu Devarakonda

DB_NAME = "studybuddy";

conn = new Mongo()
db = conn.getDB(DB_NAME);


db.createCollection("users", {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    required: [
		"userInfo",
		"userid",
		"zoom_id"
	    ],
	    properties: {
		userInfo: {
		    bsonType: "object",
		    required: [
			"name",
			"major",
			"classes",
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
		}
		zoomid: {
		    bsonType: "string",
		    description: "User's zoom id."
		}
		past_buddies: {
		    bsonType: "array",
		    items: {
			bsonType: "object"
		    },
		    description: "Contains past buddies the user has interacted with."
		},
		buddy_requests: {
		    bsonType: "array",
		    items: {
			bsonType: "objectId"
			description: "Reference to object in requests table"
		    }
		    description: "Contains references to current pending, accepton, and past requests for the user"
		}
	    }
	}
    }
});
