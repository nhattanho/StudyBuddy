/**
 * @file Contains test users and exports a list of test users.
 * @author Vishnu Devarakonda
 */
const IDs = require('./testIds');
const testBuddyRequests = require('./testBuddyRequestsData')

let walter = {
    _id: IDs.users.walter,
    name: "walter white",
    major: "Chemistry Ph.D",
    classes: ["Advanced Chemistry"],
    zoomid: "@Hiesenberg",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg/revision/latest/scale-to-width-down/540?cb=20130928055404"
}

let jessie = {
    _id: IDs.users.jessie,
    name: "jessie pinkman",
    major: "Chemistry B.S.",
    classes: ["Chemistry 101", "Cooking", "Heat Transfer"],
    zoomid: "@YeahScience!",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/0/0c/JesseS5B.jpg/revision/latest/scale-to-width-down/446?cb=20130804210124"
}

let gus = {
    _id: IDs.users.gus,
    name: "gus fring",
    major: "MBA",
    classes: ["Managerial Economics"],
    zoomid: "@LosPollosHermano",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/b/be/Season_4_-_Gus.jpg/revision/latest/scale-to-width-down/1000?cb=20200608213000"
}


let hank = {
    _id: IDs.users.hank,
    name: "hank schrader",
    major: "Geology B.S.",
    classes: ["Rocks & Minerals 101"],
    zoomid: "@RoboCop",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/7/7b/Hank_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044210"
}

let mike = {
    _id: IDs.users.mike,
    name: "mike ehramantraut",
    major: "Mechanical Engineer B.S.",
    classes: ["Kinematics"],
    zoomid: "@HitMan",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/8/8b/MikeS5.jpg/revision/latest/scale-to-width-down/750?cb=20120620015454"
}


let todd = {
    _id: IDs.users.todd,
    name: "todd alquist",
    major: "Mathematics Ph.D",
    classes: ["Number Theory", "Causal Mechanisms"],
    zoomid: "@TriggerHappy",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/f/f5/Todd_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044419"
}

let saul = {
    _id: IDs.users.saul,
    name: "saul goodman",
    major: "J.D",
    classes: ["Criminal Law"],
    zoomid: "@BetterCallSaul",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/a/a4/Saul_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044437"
}

let skyler = {
    _id: IDs.users.skyler,
    name: "skyler white",
    major: "Economics M.S.",
    classes: ["Managerial Economics"],
    zoomid: "@SWhite",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/3/33/Skyler_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044318"
}

walter["pastbuddies"] = [
    {
        _id: jessie._id,
        name: jessie.name,
        profileURL: jessie.profileURL
    },
    {
        _id: skyler._id,
        name: skyler.name,
        profileURL: skyler.profileURL
    }
]

walter["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestWalterJessie._id,
        status: testBuddyRequests.requestWalterJessie.status,
        userOwner: true,
        secondUser: {
            _id: jessie._id,
            name: jessie.name,
            profileURL: jessie.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestWalterGus._id,
        status: testBuddyRequests.requestWalterGus.status,
        userOwner: true,
        secondUser: {
            _id: gus._id,
            name: gus.name,
            profileURL: gus.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestWalterHank._id,
        status: testBuddyRequests.requestWalterHank.status,
        userOwner: true,
        secondUser: {
            _id: hank._id,
            name: hank.name,
            profileURL: hank.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestMikeWalter._id,
        status: testBuddyRequests.requestMikeWalter.status,
        userOwner: false,
        secondUser: {
            _id: mike._id,
            name: mike.name,
            profileURL: mike.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestSkylerWalter._id,
        status: testBuddyRequests.requestSkylerWalter.status,
        userOwner: false,
        secondUser: {
            _id: skyler._id,
            name: skyler.name,
            profileURL: skyler.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestSaulWalter._id,
        status: testBuddyRequests.requestSaulWalter.status,
        userOwner: false,
        secondUser: {
            _id: saul._id,
            name: saul.name,
            profileURL: saul.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestJessieWalter._id,
        status: testBuddyRequests.requestJessieWalter.status,
        userOwner: false,
        secondUser: {
            _id: jessie._id,
            name: jessie.name,
            profileURL: jessie.profileURL
        }
    }
]

jessie["pastbuddies"]  = [
    {
        _id: walter._id,
        name: walter.name,
        profileURL: walter.profileURL
    }
]

jessie["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestHankJessie._id,
        status: testBuddyRequests.requestHankJessie.status,
        userOwner: false,
        secondUser: {
            _id: hank._id,
            name: hank.name,
            profileURL: hank.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestJessieWalter._id,
        status: testBuddyRequests.requestJessieWalter.status,
        userOwner: true,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestWalterJessie._id,
        status: testBuddyRequests.requestWalterJessie.status,
        userOwner: false,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    }
]

gus["pastbuddies"] = [
    {
        _id: mike._id,
        name: mike.name,
        profileURL: mike.profileURL
    }
]

gus["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestWalterGus._id,
        status: testBuddyRequests.requestWalterGus.status,
        userOwner: false,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    }
]

hank["pastbuddies"] =  [
    {
        _id: walter._id,
        name: walter.name,
        profileURL: walter.profileURL
    },
    {
        _id: skyler._id,
        name: skyler.name,
        profileURL: skyler.profileURL
    }
]

hank["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestHankJessie._id,
        status: testBuddyRequests.requestHankJessie.status,
        userOwner: true,
        secondUser: {
            _id: jessie._id,
            name: jessie.name,
            profileURL: jessie.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestWalterHank._id,
        status: testBuddyRequests.requestWalterHank.status,
        userOwner: false,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    }
]

mike["pastbuddies"] = [
    {
        _id: gus._id,
        name: gus.name,
        profileURL: gus.profileURL
    }
]

mike["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestMikeWalter._id,
        status: testBuddyRequests.requestMikeWalter.status,
        userOwner: true,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    },
]

saul["pastbuddies"] = [
    {
        _id: jessie._id,
        name: jessie.name,
        profileURL: jessie.profileURL
    }
]

saul["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestSaulWalter._id,
        status: testBuddyRequests.requestSaulWalter.status,
        userOwner: true,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    }
]

skyler["pastbuddies"] = [
    {
        _id: walter._id,
        name: walter.name,
        profileURL: walter.profileURL
    },
    {
        _id: hank._id,
        name: hank.name,
        profileURL: hank.profileURL
    }
]

skyler["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestSkylerWalter._id,
        status: testBuddyRequests.requestSkylerWalter.status,
        userOwner: true,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    }
]


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