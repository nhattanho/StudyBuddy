/**
* @file Contains test users and exports a list of test users.
* @author Vishnu Devarakonda
*/
const mongoose = require('mongoose');
const IDs = require('./testIds');

let walter = {
    id: IDs.users.walter,
    userinfo: {
	name: "Walter White",
	major: "Chemistry Ph.D",
	classes: ["Advanced Chemistry"]
    },
    zoomid: "@Hiesenberg",
    pastbuddies: [
	IDs.users.jessie,
	IDs.users.skyler
    ],
    buddyrequests: [
	IDs.userRequests.requestWalterJessie,
	IDs.userRequests.requestWalterGus,
	IDs.userRequests.requestWalterHank,
	IDs.userRequests.requestMikeWalter,
	IDs.userRequests.requestSkylerWalter,
	IDs.userRequests.requestSaulWalter,
	IDs.userRequests.requestJessieWalter,
    ]
}


let jessie = {
    id: IDs.users.jessie,
    userinfo: {
	name: "Jessie Pinkman",
	major: "Chemistry B.S.",
	classes: ["Chemistry 101", "Cooking", "Heat Transfer"]
    },
    zoomid: "@YeahScience!",
    pastbuddies: [
	IDs.users.walter
    ],
    buddyrequests: [
	IDs.userRequests.requestHankJessie,
	IDs.userRequests.requestJessieWalter,
	IDs.userRequests.requestWalterJessie
    ]
}

let gus = {
    id: IDs.users.gus,
    userinfo: {
	name: "Gus Fring",
	major: "MBA",
	classes: ["Managerial Economics"]
    },
    zoomid: "@LosPollosHermano",
    pastbuddies: [
	IDs.users.mike
    ],
    buddyrequests: [
	IDs.userRequests.requestWalterGus
    ]
}

let hank = {
    id: IDs.users.hank,
    userinfo: {
	name: "Hank Schrader",
	major: "Geology B.S.",
	classes: ["Rocks & Minerals 101"]
    },
    zoomid: "@RoboCop",
    pastbuddies: [
	IDs.users.walter,
	IDs.users.skyler
    ],
    buddyrequests: [
	IDs.userRequests.requestHankJessie,
	IDs.userRequests.requestWalterHank
    ]
}

let mike = {
    id: IDs.users.mike,
    userinfo: {
	name: "Mike Ehramantraut",
	major: "Mechanical Engineer B.S.",
	classes: ["Kinematics"]
    },
    zoomid: "@HitMan",
    pastbuddies: [
	IDs.users.gus
    ],
    buddyrequests: [
	IDs.userRequests.requestMikeWalter
    ]
}


let todd = {
    id: IDs.users.todd,
    userinfo: {
	name: "Todd Alquist",
	major: "Mathematics Ph.D",
	classes: ["Number Theory", "Causal Mechanisms"]
    },
    zoomid: "@TriggerHappy",
    pastbuddies: [],
    buddyrequests: []
}

let saul = {
    id: IDs.users.saul,
    userinfo: {
	name: "Saul Goodman",
	major: "J.D",
	classes: ["Criminal Law"]
    },
    zoomid: "@BetterCallSaul",
    pastbuddies: [
	IDs.users.jessie
    ],
    buddyrequests: [
	IDs.userRequests.requestSaulWalter
    ]
}

let skyler = {
    id: IDs.users.skyler,
    userinfo: {
	name: "Skyler White",
	major: "Economics M.S.",
	classes: ["Managerial Economics"]
    },
    zoomid: "@SWhite",
    pastbuddies: [
	IDs.users.walter,
	IDs.users.hank
    ],
    buddyrequests: [
	IDs.userRequests.requestSkylerWalter
    ]
}


let testUsers = [
    walter,
    jessie,
    gus,
    hank,
    mike,
    todd,
    saul,
    skyler
];

module.exports = testUsers;
