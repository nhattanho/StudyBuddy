// File loads test buddy requests documents
// By: Vishnu Devarakonda
const buddyrequests = require("./buddyRequestsModel");

// Walter's requests
// For below the sender is walter
let walterTestRequest1 = {
    sender: null,
    receiver: null, // jessie objectid
    status: "Accepted",
    dateslots: [Date(), Date()];
}

let walterTestRequest2 = {
    sender: null,
    receiver: null, // Gus Fring's objectid
    status: "Pending",
    dateslots: [Date(), Date(), Date()];
}

let walterTestRequest3 = {
    sender: null,
    receiver: null, // Hank Schrader's objecid
    status: "Cancelled",
    dateslots: [Date()]
}

// Below walter is the reciever

let walterTestRequest4 = {
    sender: null, // Mike Eharmantraut
    receiver: null,
    status: "Accepted",
    dateslots: [Date(), Date()];
}

let walterTestRequest5 = {
    sender: null, // Skyler
    receiver: null,
    status: "Pending",
    dateslots: [Date(), Date(), Date()]
}

let walterTestRequest6 = {
    sender: null, // Saul Goodman
    receiver: null,
    status: "Cancelled",
    dateslots: [Date()]
}


// Jessie's requests
// Jessie is the sender

let jessieTestRequest1 = {
    sender: null,
    receiver: null, // walter
    status: "Pending",
    dateslots: [Date(), Date(), Date()]
}


// Jessie is the receiver

let jessieTestRequest2 = {
    sender: null, // hank
    receiver: null,
    status: "Pending",
    dateslots: [Date()]
}


