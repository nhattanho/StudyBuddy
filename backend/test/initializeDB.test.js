let mongoose = require('mongoose');
let DBMethods = require("./initializeDB.js");
const usersModel = require('../model/usersModel');



describe("Tests for initializing DB", () => {
    let con;
    const connectParams = {
	dbName: "studybuddy"
    };

    beforeAll(async () => {
	con = await mongoose.connect(DBMethods.DEFAULT_DB_ENDPOINT, connectParams)
    });

    afterAll(async (done) => {
    	await mongoose.connection.close(function(err){
    	    if (err) throw err;
    	    console.log("Close DB");
    	});
    });

    
    test('Test method InitializeDB', async () => {
	// mongoose.connect(DBMethods.DEFAULT_DB_ENDPOINT, {dbName: 'studybuddy'});
	// const result = await DBMethods.initializeDB();
	// mongoose.connection.close();
	DBMethods.initializeDB().then((data) => {
	    console.log(data);
	}).then((err) => {
	    throw err;
	});
    });
});
