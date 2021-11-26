/**
 * @file Contains test buddy requests
 * @author Vishnu Devarakonda
 */
const IDs = require('./testIds');

// Walter's requests
// For below the sender is walter
const requestWalterJesse = {
    _id: IDs.userRequests.requestWalterJesse,
    sender: IDs.users.walter,
    receiver: IDs.users.jesse,
    status: "Accepted",
    dateslots: [Date(), Date()]
}

const requestWalterGus = {
    _id: IDs.userRequests.requestWalterGus,
    sender: IDs.users.walter,
    receiver: IDs.users.gus,
    status: "Pending",
    dateslots: [Date(), Date(), Date(), Date()]
}

const requestWalterHank = {
    _id: IDs.userRequests.requestWalterHank,
    sender: IDs.users.walter,
    receiver: IDs.users.hank,
    status: "Cancelled",
    dateslots: [Date(), Date()]
}

// Below walter is the reciever

const requestMikeWalter = {
    _id: IDs.userRequests.requestMikeWalter,
    sender: IDs.users.mike,
    receiver: IDs.users.walter,
    status: "Accepted",
    dateslots: [Date(), Date()]
}

const requestSkylerWalter = {
    _id: IDs.userRequests.requestSkylerWalter,
    sender: IDs.users.skyler,
    receiver: IDs.users.walter,
    status: "Pending",
    dateslots: [Date(), Date(), Date(), Date()]
}

const requestSaulWalter = {
    _id: IDs.userRequests.requestSaulWalter,
    sender: IDs.users.saul,
    receiver: IDs.users.walter,
    status: "Cancelled",
    dateslots: [Date(), Date()]
}


// Jesse's requests
// Jesse is the sender

const requestJesseWalter = {
    _id: IDs.userRequests.requestJesseWalter,
    sender: IDs.users.jesse,
    receiver: IDs.users.walter,
    status: "Pending",
    dateslots: [Date(), Date(), Date(), Date()]
}


// Jesse is the receiver

const requestHankJesse = {
    _id: IDs.userRequests.requestHankJesse,
    sender: IDs.users.hank,
    receiver: IDs.users.jesse,
    status: "Pending",
    dateslots: [Date(), Date()]
}

const testBuddyRequests = {
    requestWalterJesse: requestWalterJesse,
    requestWalterGus: requestWalterGus,
    requestWalterHank: requestWalterHank,
    requestMikeWalter: requestMikeWalter,
    requestSkylerWalter: requestSkylerWalter,
    requestSaulWalter: requestSaulWalter,
    requestJesseWalter: requestJesseWalter,
    requestHankJesse: requestHankJesse
}

module.exports = testBuddyRequests