/**
 * @file Contains test users and exports a list of test users.
 * @author Vishnu Devarakonda
 */
const IDs = require('./testIds');

let walter = {
    _id: IDs.users.walter,
    name: "walter white",
    major: "Chemistry Ph.D",
    classes: ["Advanced Chemistry"],
    zoomid: "@Hiesenberg",
    pastbuddies: [
        {
            _id: IDs.users.jessie,
            name: "jessie pinkman"
        },
        {
            _id: IDs.users.skyler,
            name: "skyler white"
        }
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
    _id: IDs.users.jessie,
    name: "jessie pinkman",
    major: "Chemistry B.S.",
    classes: ["Chemistry 101", "Cooking", "Heat Transfer"],
    zoomid: "@YeahScience!",
    pastbuddies: [
        {
            _id: IDs.users.walter,
            name: "walter white"
        }
    ],
    buddyrequests: [
        IDs.userRequests.requestHankJessie,
        IDs.userRequests.requestJessieWalter,
        IDs.userRequests.requestWalterJessie
    ]
}

let gus = {
    _id: IDs.users.gus,
    name: "gus fring",
    major: "MBA",
    classes: ["Managerial Economics"],
    zoomid: "@LosPollosHermano",
    pastbuddies: [
        {
            _id: IDs.users.mike,
            name: "mike ehamantraut"
        }
    ],
    buddyrequests: [
        IDs.userRequests.requestWalterGus
    ]
}

let hank = {
    _id: IDs.users.hank,
    name: "hank schrader",
    major: "Geology B.S.",
    classes: ["Rocks & Minerals 101"],
    zoomid: "@RoboCop",
    pastbuddies: [
        {
            _id: IDs.users.walter,
            name: "walter white"
        },
        {
            _id: IDs.users.skyler,
            name: "skyler white"
        }
    ],
    buddyrequests: [
        IDs.userRequests.requestHankJessie,
        IDs.userRequests.requestWalterHank
    ]
}

let mike = {
    _id: IDs.users.mike,
    name: "mike ehramantraut",
    major: "Mechanical Engineer B.S.",
    classes: ["Kinematics"],
    zoomid: "@HitMan",
    pastbuddies: [
        {
            _id: IDs.users.gus,
            name: "gus fring"
        }
    ],
    buddyrequests: [
        IDs.userRequests.requestMikeWalter
    ]
}


let todd = {
    _id: IDs.users.todd,
    name: "todd alquist",
    major: "Mathematics Ph.D",
    classes: ["Number Theory", "Causal Mechanisms"],
    zoomid: "@TriggerHappy",
    pastbuddies: [],
    buddyrequests: []
}

let saul = {
    _id: IDs.users.saul,
    name: "saul goodman",
    major: "J.D",
    classes: ["Criminal Law"],
    zoomid: "@BetterCallSaul",
    pastbuddies: [
        {
            _id: IDs.users.jessie,
            name: "jessie pinkman"
        }
    ],
    buddyrequests: [
        IDs.userRequests.requestSaulWalter
    ]
}

let skyler = {
    _id: IDs.users.skyler,
    name: "skyler white",
    major: "Economics M.S.",
    classes: ["Managerial Economics"],
    zoomid: "@SWhite",
    pastbuddies: [
        {
            _id: IDs.users.walter,
            name: "walter white"
        },
        {
            _id: IDs.users.hank,
            name: "hank schrader"
        }
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