/**
* @file Contains test users and exports a list of test users.
* @author Vishnu Devarakonda
*/

let testUser1 = {
    userinfo: {
	name: "Walter White",
	major: "Chemistry Ph.D",
	classes: ["Advanced Chemistry"]
    },
    zoomid: "@Hiesenberg"
}


let testUser2 = {
    userinfo: {
	name: "Jessie Pickman",
	major: "Chemistry B.S.",
	classes: ["Chemistry 101", "Cooking", "Heat Transfer"]
    },
    zoomid: "@YeahScience!"
}

let testUser3 = {
    userinfo: {
	name: "Gus Fring",
	major: "MBA",
	classes: ["Managerial Economics"]
    },
    zoomid: "@LosPollosHermano"
}

let testUser4 = {
    userinfo: {
	name: "Hank Schrader",
	major: "Geology B.S.",
	classes: ["Rocks & Minerals 101"]
    },
    zoomid: "@RoboCop"
}

let testUser5 = {
    userinfo: {
	name: "Mike Ehramantraut",
	major: "Mechanical Engineer B.S.",
	classes: ["Kinematics"]
    },
    zoomid: "@HitMan"
}


let testUser6 = {
    userinfo: {
	name: "Todd Alquist",
	major: "Mathematics Ph.D",
	classes: ["Number Theory", "Causal Mechanisms"]
    },
    zoomid: "@TriggerHappy"
}

let testUser7 = {
    userinfo: {
	name: "Saul Goodman",
	major: "J.D",
	classes: ["Criminal Law"]
    },
    zoomid: "@BetterCallSaul"
}

let testUser8 = {
    userinfo: {
	name: "Skyler White",
	major: "Economics M.S.",
	classes: ["Managerial Economics"]
    },
    zoomid: "@SWhite"
}


let testUsers = [
    testUser1,
    testUser2,
    testUser3,
    testUser4,
    testUser5,
    testUser6,
    testUser7,
    testUser8
];

exports.testUsers = testUsers;
