/**
 * @file Contains tests for classes API
 * @author Vishnu Devarakonda
 */
const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const DB = require("../model/DBconsts");
const DBMethods = require("../test/initializeDB.js");
const major = require('./major');
let majors = require('../model/majors')

const connectParams = {
    dbName: DB.name
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
 * Majors API test suite
 */
describe("Testing Majors API", () => {
    const majorsAPI = express();
    majorsAPI.use("/major", major)
    majorsAPI.use(cors());
    majorsAPI.use(bodyParser.urlencoded({extended: true}))
    majorsAPI.use(bodyParser.json());

    /**
     * Function tests endpoint /name to get name of major with given id
     * @author Vishnu Devarakonda
     */
    test("Get major given ID", done => {
        const endpoint = "/major/name"
        request(majorsAPI)
        .get(endpoint)
        .query({id: majors.geology.id})
        .expect(200, majors.geology, done)
    })

    /**
     * Function tests endpoint / to list of available majors
     * @author Vishnu Devarakonda
     */
    test("Get all majors with paging", done => {
        const endpoint = "/major"
        request(majorsAPI)
        .get(endpoint)
        .expect(200,Object.values(majors),done)
    })
})