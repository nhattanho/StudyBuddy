/**
 * @file Contains test buddy requests
 * @author Vishnu Devarakonda
 */
const IDs = require('./testIds');

// Walter's requests
// For below the sender is walter
let walterTestRequest1 = {
    id: IDs.userRequests.requestWalterJessie,
    sender: IDs.users.walter,
    receiver: IDs.users.jessie,
    status: "Accepted",
    dateslots: [Date(), Date()]
}

let walterTestRequest2 = {
    id: IDs.userRequests.requestWalterGus,
    sender: IDs.users.walter,
    receiver: IDs.users.gus,
    status: "Pending",
    dateslots: [Date(), Date(), Date()]
}

let walterTestRequest3 = {
    id: IDs.userRequests.requestWalterHank,
    sender: IDs.users.walter,
    receiver: IDs.users.hank,
    status: "Cancelled",
    dateslots: [Date()]
}

// Below walter is the reciever

let walterTestRequest4 = {
    id: IDs.userRequests.requestMikeWalter,
    sender: IDs.users.mike,
    receiver: IDs.users.walter,
    status: "Accepted",
    dateslots: [Date(), Date()]
}

let walterTestRequest5 = {
    id: IDs.userRequests.requestSkylerWalter,
    sender: IDs.users.skyler,
    receiver: IDs.users.walter,
    status: "Pending",
    dateslots: [Date(), Date(), Date()]
}

let walterTestRequest6 = {
    id: IDs.userRequests.requestSaulWalter,
    sender: IDs.users.saul,
    receiver: IDs.users.walter,
    status: "Cancelled",
    dateslots: [Date()]
}


// Jessie's requests
// Jessie is the sender

let jessieTestRequest1 = {
    id: IDs.userRequests.requestJessieWalter,
    sender: IDs.users.jessie,
    receiver: IDs.users.walter,
    status: "Pending",
    dateslots: [Date(), Date(), Date()]
}


// Jessie is the receiver

let jessieTestRequest2 = {
    id: IDs.userRequests.requestHankJessie,
    sender: IDs.users.hank,
    receiver: IDs.users.jessie,
    status: "Pending",
    dateslots: [Date()]
}

let testBuddyRequests = [
    walterTestRequest1,
    walterTestRequest2,
    walterTestRequest3,
    walterTestRequest4,
    walterTestRequest5,
    walterTestRequest6,
    jessieTestRequest1,
    jessieTestRequest2
];

module.exports = testBuddyRequests