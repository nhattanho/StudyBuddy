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
const classes = require('./classes');
let testClasses = require('../model/classes')
testClassesMap = testClasses.reduce((o, key) => ({...o,[key.id] : key}), {})

const connectParams = {
    dbName: DB.name
}

beforeAll(async () => {
    await mongoose.connect(DB.DEFAULT_DB_ENDPOINT, connectParams)
    const [userResults, classResults, buddyRequestResults] = await Promise.all(
        DBMethods.initializeDB());
})


afterAll(async () => {
    const [userResults, classResults, buddyRequestResults] = await Promise.all(
        DBMethods.clearDB());
    await mongoose.disconnect();

})


/**
 * classes API test suite
 */
describe("Testing classes API", () => {
    const classesAPI = express();
    classesAPI.use("/classes", classes)
    classesAPI.use(cors());
    classesAPI.use(bodyParser.urlencoded({extended: true}))
    classesAPI.use(bodyParser.json());

    /**
     * Fuction tests endpoint /name to get name of class with given id
     * @author Vishnu Devarakonda
     */
    test("Get product given ID", done => {
        const endpoint = "/classes/name"
        request(classesAPI)
        .get(endpoint)
        .query({id: testClassesMap.CS31.id})
        .expect(200, testClassesMap.CS31, done)
    })

    /**
     * Fuction tests endpoint / to list of available
     * @author Vishnu Devarakonda
     */
    test("Get products with paging", done => {
        const endpoint = "/classes"
        request(classesAPI)
        .get(endpoint)
        .query({skipC: 0})
        .expect(200,testClasses.slice(0,5),done)

        request(classesAPI)
        .get(endpoint)
        .query({skipC: 1})
        .expect(200,testClasses.slice(5,10),done)

        request(classesAPI)
        .get(endpoint)
        .query({skipC: 2})
        .expect(200,testClasses.slice(10,15),done)
    })
})