/**
 * @file Contains test users and exports a list of test users.
 * @author Vishnu Devarakonda
 */
const IDs = require('./testIds');
const testBuddyRequests = require('./testBuddyRequestsData')

let walter = {
    _id: IDs.users.walter,
    name: "walter white",
    about: "I'm the one who knocks!",
    birthday: new Date("09","07","1958").getTime(),
    major: "Chemistry",
    year: "Ph.D",
    classes: ["Advanced Chemistry"],
    zoomid: "@Hiesenberg",
    email: "Hiesenberg@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg/revision/latest/scale-to-width-down/540?cb=20130928055404"
}

let jesse = {
    _id: IDs.users.jesse,
    name: "jesse pinkman",
    about: "When I'm not sciencing, I'm cooking : )",
    birthday: new Date("09", "24", "1984").getTime(),
    major: "Chemistry",
    year: "Freshman",
    classes: ["Chemistry 101", "Cooking", "Heat Transfer"],
    zoomid: "@YeahScience!",
    email: "YeahScience@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/0/0c/JesseS5B.jpg/revision/latest/scale-to-width-down/446?cb=20130804210124"
}

let gus = {
    _id: IDs.users.gus,
    name: "gus fring",
    about: "I don't really need a study partner, I'm just looking for chemists for my start up!",
    birthday: new Date("04", "26", "1958").getTime(),
    major: "MBA",
    year: "Graduate",
    classes: ["Managerial Economics"],
    zoomid: "@LosPollosHermano",
    email: "LosPollosHermano@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/b/be/Season_4_-_Gus.jpg/revision/latest/scale-to-width-down/1000?cb=20200608213000"
}


let hank = {
    _id: IDs.users.hank,
    name: "hank schrader",
    about: "If we do study together, never call then rocks. THEY MINERALS!",
    birthday: new Date("03", "13", "1966").getTime(),
    major: "Geology",
    year: "Freshman",
    classes: ["Rocks & Minerals 101"],
    zoomid: "@RoboCop",
    email: "RoboCop@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/7/7b/Hank_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044210"
}

let mike = {
    _id: IDs.users.mike,
    name: "mike ehramantraut",
    birthday: new Date("07","21", "1944").getTime(),
    major: "Mechanical Engineer",
    year: "Junior",
    classes: ["Kinematics"],
    zoomid: "@HitMan",
    email: "HitMan@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/8/8b/MikeS5.jpg/revision/latest/scale-to-width-down/750?cb=20120620015454"
}


let todd = {
    _id: IDs.users.todd,
    name: "todd alquist",
    birthday: new Date("09", "24", "1984").getTime(),
    major: "Mathematics",
    year: "Ph.D",
    classes: ["Number Theory", "Causal Mechanisms"],
    zoomid: "@TriggerHappy",
    email: "TriggerHappy@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/f/f5/Todd_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044419"
}

let saul = {
    _id: IDs.users.saul,
    name: "saul goodman",
    about: "Don't drink and drive, but if you do call Saul",
    birthday: new Date("11", "12", "1960").getTime(),
    major: "J.D",
    year: "Ph.D",
    classes: ["Criminal Law"],
    zoomid: "@BetterCallSaul",
    email: "BetterCallSaul@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/a/a4/Saul_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044437"
}

let skyler = {
    _id: IDs.users.skyler,
    name: "skyler white",
    birthday: new Date("08", "11", "1970").getTime(),
    major: "Economics",
    year: "Graduate",
    classes: ["Managerial Economics"],
    zoomid: "@SWhite",
    email: "SWhite@gmail.com",
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/3/33/Skyler_S5b.jpg/revision/latest/scale-to-width-down/750?cb=20130717044318"
}

walter["pastbuddies"] = [
    {
        _id: jesse._id,
        name: jesse.name,
        profileURL: jesse.profileURL
    },
    {
        _id: skyler._id,
        name: skyler.name,
        profileURL: skyler.profileURL
    }
]

walter["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestWalterJesse._id,
        status: testBuddyRequests.requestWalterJesse.status,
        userOwner: true,
        secondUser: {
            _id: jesse._id,
            name: jesse.name,
            profileURL: jesse.profileURL
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
        _id: testBuddyRequests.requestJesseWalter._id,
        status: testBuddyRequests.requestJesseWalter.status,
        userOwner: false,
        secondUser: {
            _id: jesse._id,
            name: jesse.name,
            profileURL: jesse.profileURL
        }
    }
]

jesse["pastbuddies"]  = [
    {
        _id: walter._id,
        name: walter.name,
        profileURL: walter.profileURL
    }
]

jesse["buddyrequests"] = [
    {
        _id: testBuddyRequests.requestHankJesse._id,
        status: testBuddyRequests.requestHankJesse.status,
        userOwner: false,
        secondUser: {
            _id: hank._id,
            name: hank.name,
            profileURL: hank.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestJesseWalter._id,
        status: testBuddyRequests.requestJesseWalter.status,
        userOwner: true,
        secondUser: {
            _id: walter._id,
            name: walter.name,
            profileURL: walter.profileURL
        }
    },
    {
        _id: testBuddyRequests.requestWalterJesse._id,
        status: testBuddyRequests.requestWalterJesse.status,
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
        _id: testBuddyRequests.requestHankJesse._id,
        status: testBuddyRequests.requestHankJesse.status,
        userOwner: true,
        secondUser: {
            _id: jesse._id,
            name: jesse.name,
            profileURL: jesse.profileURL
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
        _id: jesse._id,
        name: jesse.name,
        profileURL: jesse.profileURL
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
    jesse,
    gus,
    hank,
    mike,
    todd,
    saul,
    skyler
];


module.exports = testUsers;