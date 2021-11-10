/**
 * @file Contains test buddy requests
 * @author Vishnu Devarakonda
 */
const IDs = require('./testIds');

// Walter's requests
// For below the sender is walter
const requestWalterJessie = {
    _id: IDs.userRequests.requestWalterJessie,
    sender: IDs.users.walter,
    receiver: IDs.users.jessie,
    status: "Accepted",
    dateslots: [Date(), Date()]
}

const requestWalterGus = {
    _id: IDs.userRequests.requestWalterGus,
    sender: IDs.users.walter,
    receiver: IDs.users.gus,
    status: "Pending",
    dateslots: [Date(), Date(), Date()]
}

const requestWalterHank = {
    _id: IDs.userRequests.requestWalterHank,
    sender: IDs.users.walter,
    receiver: IDs.users.hank,
    status: "Cancelled",
    dateslots: [Date()]
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
    dateslots: [Date(), Date(), Date()]
}

const requestSaulWalter = {
    _id: IDs.userRequests.requestSaulWalter,
    sender: IDs.users.saul,
    receiver: IDs.users.walter,
    status: "Cancelled",
    dateslots: [Date()]
}


// Jessie's requests
// Jessie is the sender

const requestJessieWalter = {
    _id: IDs.userRequests.requestJessieWalter,
    sender: IDs.users.jessie,
    receiver: IDs.users.walter,
    status: "Pending",
    dateslots: [Date(), Date(), Date()]
}


// Jessie is the receiver

const requestHankJessie = {
    _id: IDs.userRequests.requestHankJessie,
    sender: IDs.users.hank,
    receiver: IDs.users.jessie,
    status: "Pending",
    dateslots: [Date()]
}

const testBuddyRequests = {
    requestWalterJessie: requestWalterJessie,
    requestWalterGus: requestWalterGus,
    requestWalterHank: requestWalterHank,
    requestMikeWalter: requestMikeWalter,
    requestSkylerWalter: requestSkylerWalter,
    requestSaulWalter: requestSaulWalter,
    requestJessieWalter: requestJessieWalter,
    requestHankJessie: requestHankJessie
}

module.exports = testBuddyRequests