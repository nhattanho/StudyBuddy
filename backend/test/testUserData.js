/**
 * @file Contains test users and exports a list of test users.
 * @author Vishnu Devarakonda
 */
const IDs = require('./testIds');
const testBuddyRequests = require('./testBuddyRequestsData')
const majors = require('../model/majors')
let classes = require('../model/classes')
classes = classes.reduce((o, key) => ({...o,[key.id] : key}), {})

let walter = {
    _id: IDs.users.walter,
    name: "walter white",
    about: "I'm the one who knocks!",
    birthday: new Date("09","07","1958").getTime(),
    username: "Hiesenberg",
    checkLogin: "yes",
    major: majors.chemistry.name,
    year: "Ph.D",
    classes: [classes.CS199.id],
    zoomid: "@Hiesenberg",
    email: "Hiesenberg@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg"
}

let jesse = {
    _id: IDs.users.jesse,
    name: "jesse pinkman",
    about: "When I'm not sciencing, I'm cooking : )",
    birthday: new Date("09", "24", "1984").getTime(),
    username: "YeahScience!",
    checkLogin: "yes",
    major: majors.chemistry.name,
    year: "Freshman",
    classes: [classes.CS31.id, classes.CS32.id],
    zoomid: "@YeahScience!",
    email: "YeahScience@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/0/0c/JesseS5B.jpg"
}

let gus = {
    _id: IDs.users.gus,
    name: "gus fring",
    about: "I don't really need a study partner, I'm just looking for chemists for my start up!",
    birthday: new Date("04", "26", "1958").getTime(),
    username: "LosPollosHermano",
    checkLogin: "no",
    major: majors.mba.name,
    year: "Graduate",
    classes: [classes.CS188.id],
    zoomid: "@LosPollosHermano",
    email: "LosPollosHermano@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/b/be/Season_4_-_Gus.jpg"
}


let hank = {
    _id: IDs.users.hank,
    name: "hank schrader",
    about: "If we do study together, never call then rocks. THEY MINERALS!",
    birthday: new Date("03", "13", "1966").getTime(),
    username: "RoboCop",
    checkLogin: "yes",
    major: majors.geology.name,
    year: "Freshman",
    classes: [classes.CS32.id],
    zoomid: "@RoboCop",
    email: "RoboCop@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/7/7b/Hank_S5b.jpg"
}

let mike = {
    _id: IDs.users.mike,
    name: "mike ehramantraut",
    birthday: new Date("07","21", "1944").getTime(),
    username: "HitMan",
    checkLogin: "yes",
    major: majors.mechanicalEngineering.name,
    year: "Junior",
    classes: [classes.CS180.id],
    zoomid: "@HitMan",
    email: "HitMan@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/8/8b/MikeS5.jpg"
}


let todd = {
    _id: IDs.users.todd,
    name: "todd alquist",
    birthday: new Date("09", "24", "1984").getTime(),
    username: "TriggerHappy",
    checkLogin: "no",
    major: majors.mathematics.name,
    year: "Ph.D",
    classes: [classes.CS194.id, classes.CSM192A.id],
    zoomid: "@TriggerHappy",
    email: "TriggerHappy@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/f/f5/Todd_S5b.jpg"
}

let saul = {
    _id: IDs.users.saul,
    name: "saul goodman",
    about: "Don't drink and drive, but if you do call Saul",
    birthday: new Date("11", "12", "1960").getTime(),
    username: "BetterCallSaul",
    checkLogin: "yes",
    major: majors.jurisDoctor.name,
    year: "Ph.D",
    classes: [classes.CS181.id],
    zoomid: "@BetterCallSaul",
    email: "BetterCallSaul@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/a/a4/Saul_S5b.jpg"
}

let skyler = {
    _id: IDs.users.skyler,
    name: "skyler white",
    birthday: new Date("08", "11", "1970").getTime(),
    username: "SWhite",
    checkLogin: "no",
    major: majors.economics.name,
    year: "Graduate",
    classes: [classes.CS152B.id],
    zoomid: "@SWhite",
    email: "SWhite@gmail.com",
    password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    confirm_password: '$2a$10$hDehc2VFpnHp9PAVJwQel.Z3lf2.QPC6JadeEWS.9wipuOxWj/doq',
    profileURL: "https://static.wikia.nocookie.net/breakingbad/images/3/33/Skyler_S5b.jpg"
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