// File loads test user documents
// By: Vishnu Devarakonda
load("./globals.js");


testUser1 = {
    userinfo: {
	name: "Walter White",
	major: "Chemistry Ph.D",
	classes: ["Advanced Chemistry"]
    },
    zoomid: "@Hiesenberg"
}


testUser2 = {
    userinfo: {
	name: "Jessie Pickman",
	major: "Chemistry B.S.",
	classes: ["Chemistry 101", "Cooking", "Heat Transfer"]
    },
    zoomid: "@Pickman"
}

testUser3 = {
    userinfo: {
	name: "Gus Fring",
	major: "MBA",
	classes: ["Managerial Economics"]
    },
    zoomid: "@LosPollosHermano"
}

testUser4 = {
    userinfo: {
	name: "Hank Schrader",
	major: "Geology B.S.",
	classes: ["Rocks & Minerals 101"]
    },
    zoomid: "@RoboCop"
}

testUser5 = {
    userinfo: {
	name: "Mike Ehramantraut",
	major: "Mechanical Engineer B.S.",
	classes: ["Kinematics"]
    },
    zoomid: "@HitMan"
}


testUser6 = {
    userinfo: {
	name: "Todd Alquist",
	major: "Mathematics Ph.D",
	classes: ["Number Theory", "Causal Mechanisms"]
    },
    zoomid: "@TriggerHappy"
}

testUser7 = {
    userinfo: {
	name: "Saul Goodman",
	major: "J.D",
	classes: ["Criminal Law"]
    },
    zoomid: "@BetterCallSaul"
}

testUser8 = {
    userinfo: {
	name: "Skyler White",
	major: "Economics M.S.",
	classes: ["Managerial Economics"]
    },
    zoomid: "@SWhite"
}


testUsers = [
    testUser1,
    testUser2,
    testUser3,
    testUser4,
    testUser5,
    testUser6,
    testUser7,
    testUser8
];


conn = Mongo()
users = conn.getDB(DB_NAME).getCollection(COLLECTIONS.usersCollectionName);


function insertUsers(users){
    /**
       Function inserts users and returns their userID
       args:
         users: Mongo Collection Object.
       returns:
         userIDs: List of objectId of the users
    **/
    rtn = users.insertMany(users);
	 


function getUserIDs(){
    /**
       Function gets userids from the db after insert
       args:
         None
       returns:
         none
    **/
    userIDS = db.users.
    return userIDS
