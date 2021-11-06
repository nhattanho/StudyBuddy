let mongoose = require('mongoose');
let DBMethods = require("./initializeDB.js");
const IDs = require('./testIds');

beforeAll(async () => {
    await mongoose.connect(DBMethods.DEFAULT_DB_ENDPOINT);//, connectParams)
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Tests for initializing DB", () => {
    const connectParams = {
    	dbName: "studybuddy"
    };
    
    test('Test method InitializeDB', async () => {
	const [userResults, buddyRequestResults] = await Promise.all(DBMethods.initializeDB());
	expect(userResults.length == 8).toBeTruthy();
	console.log(userResults[0]);
	expect(userResults[0].id == IDs.users.walter).toBeTruthy();
	expect(buddyRequestResults.length == 8).toBeTruthy();
    });

});
