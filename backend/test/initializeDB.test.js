/**
 * File contains tests function for testing the initiallizeDB
 * @author Vishnu Devarakonda
 */
let mongoose = require('mongoose');
let DBMethods = require("./initializeDB.js");
const IDs = require('./testIds');
const DB = require('../model/DBconsts')

const connectParams = {
    dbName: DB.name
};

beforeAll(async () => {
    await mongoose.connect(DB.DEFAULT_DB_ENDPOINT, connectParams)
});

afterAll(async () => {
    await mongoose.disconnect();
});


/**
 * Test Suite
 */
describe("Tests for initializing DB", () => {
    
    /**
     * Function tests that the DB is initialized with default test data.
     * @author Vishnu Devarakonda
     */
    test('Test method InitializeDB', async () => {
        const [
            userResults,
            classResults,
            majorResults,
            buddyRequestResults] = await Promise.all(DBMethods.initializeDB());
        expect(classResults.length == 55).toBeTruthy();
        expect(majorResults.length).toEqual(7);
        expect(userResults.length == 8).toBeTruthy();
        expect(userResults[0]._id == IDs.users.walter).toBeTruthy();
        expect(userResults[1]._id == IDs.users.jesse).toBeTruthy();
        expect(buddyRequestResults.length == 8).toBeTruthy();
        expect(buddyRequestResults[0]._id == IDs.userRequests.requestWalterJessie);
    });


    /**
     * Function clears DB of all data.
     * @author Vishnu Devarakonda
     */
    test('Test method clearDB', async () => {
        const [
            userResults,
            classResults,
            majorResults,
            buddyRequestResults] = await Promise.all(DBMethods.clearDB());
        expect(classResults.deletedCount == 55).toBeTruthy();
        expect(majorResults.deletedCount).toEqual(7);
        expect(userResults.deletedCount == 8).toBeTruthy();
        expect(buddyRequestResults.deletedCount == 8).toBeTruthy();
    })

});
