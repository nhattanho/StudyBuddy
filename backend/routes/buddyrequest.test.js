/**
 * @file Contains tests for buddy request API
 * @author Chanel Young
 */
 const request = require('supertest');
 const mongoose = require('mongoose');
 const express = require('express');
 const cors = require("cors");

 const DB = require("../model/DBconsts");
 const DBMethods = require("../test/initializeDB.js");
 const IDs = require('../test/testIds');
 const buddyrequest = require('./buddyrequest');

 const connectParams = {
     dbName: DB.test_name
 }
 
 beforeAll(async () => {
     await mongoose.connect(DB.DEFAULT_DB_ENDPOINT, connectParams)
     await Promise.all(DBMethods.initializeDB());
 })
 
 
 afterAll(async () => {
     await Promise.all(DBMethods.clearDB());
     await mongoose.disconnect();
 
 })
 
 
 /**
  * Buddy Request API test suite
  */
 describe("Testing buddy request API", () => {
     const buddyrequestAPI = express();
     buddyrequestAPI.use("/buddyrequest", buddyrequest)
     buddyrequestAPI.use(cors());
     buddyrequestAPI.use(express.urlencoded({extended: true}))
     buddyrequestAPI.use(express.json());
 

     //test /sent
     test("Get buddyrequests sent by walter", done => {
        const endpoint = `/buddyrequest/${IDs.users.walter}/sent`
        request(buddyrequestAPI)
        .get(endpoint).then((res) => {
                expect(res.body.buddyrequests.length).toBe(3); 
                done(); 
            }
        )
    });

    //test /received
    test("Get buddyrequests received by walter", done => {
    const endpoint = `/buddyrequest/${IDs.users.walter}/received`
    request(buddyrequestAPI)
    .get(endpoint).then((res) => {
            expect(res.body.buddyrequests.length).toBe(4); 
            done(); 
        }
    )
    });
    
    //TODO: add tests for create -> spent way too long resolving issues with post so will do this after app done
 })