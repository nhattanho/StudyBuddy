/**
 * File contains tests for search API
 * @author Vishnu Devarakonda
 */

const request = require("supertest")
const mongoose = require("mongoose");
const rewire = require('rewire');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const DB = require("../model/DBconsts");
const DBMethods = require("../test/initializeDB");
const search = require("./search");
const testUsers = require("../test/testUserData");
let classes = require('../model/classes')
classes = classes.reduce((o, key) => ({...o,[key.id] : key}), {})

const connectParams = {
    dbName: DB.test_name
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
 * Search API Test suite
 */
describe("Search API test suite", () => {
    const walter = testUsers[0];
    const jesse = testUsers[1];
    const mike = testUsers[4];
    const searchAPI = express();
    searchAPI.use("/search", search);
    searchAPI.use(cors());
    searchAPI.use(bodyParser.urlencoded({extended: true}))
    searchAPI.use(bodyParser.json());

    const getUsersFilter = rewire('./search').__get__('getUsersFilter')

    test('Test function getUsersFilter', () => {
        let rtn = getUsersFilter({major: ['Chemistry']})
        expect(rtn).toEqual({major: {$in: ['Chemistry']}})
        rtn = getUsersFilter(
            {
                major: ['Chemistry'],
                classes: ['CS130', 'CS131']
            })
        expect(rtn).toEqual(
            {
                major: {$in: ['Chemistry']},
                classes: {$in: ['CS130', 'CS131']}
            })
    });


    /**
     * Function tests search with no filter. Should return
     * all users.
     */
    test('Test search users with no query', done  => {
        let endpoint = "/search/users"
        request(searchAPI)
        .get(endpoint)
        .query({})
        .expect(function(resp) {
            resp.body = {
                size: resp.body.length
            }
        }).expect(200, {size: 8}, done)
    })

    /**
     * Function test search with single major
     */
    test('Test search users with single major query', done  => {
        let endpoint = "/search/users"
        request(searchAPI)
        .get(endpoint)
        .query({
            major: [walter.major]
        })
        .expect(function(resp) {
            resp.body = {
                size: resp.body.length,
                names: [resp.body[0].name,resp.body[1].name]
            }
        }).expect(200, {
            size: 2,
            names: [
                walter.name,
                jesse.name
            ]}, done)
    })

    /**
     * Function test search with multiple major
     */
    test('Test search users with multiple major query', done  => {
        let endpoint = "/search/users"
        request(searchAPI)
        .get(endpoint)
        .query({
            major: [walter.major, mike.major]
        })
        .expect(function(resp) {
            resp.body = {
                size: resp.body.length,
                names: [resp.body[0].name,resp.body[1].name,resp.body[2].name]
            }
        }).expect(200, {
            size: 3,
            names: [
                walter.name,
                jesse.name,
                mike.name
            ]}, done)
    })

    /**
     * Function tests query with multiple class
     */
    test('Test search users with multiple class query', done =>{
        let endpoint = "/search/users"
        request(searchAPI)
        .get(endpoint)
        .query({
            classes: [classes.CS199.id, classes.CS31.id]
        })
        .expect(function(resp) {
            resp.body = {
                size: resp.body.length,
                names: [resp.body[0].name,resp.body[1].name]
            }
        }).expect(200, {
            size: 2,
            names: [walter.name, jesse.name]}, done)
    })

    /**
     * Function test query with single class
     */
    test('Test search users with single classes query', done  => {
        let endpoint = "/search/users"
        request(searchAPI)
        .get(endpoint)
        .query({
            classes: [classes.CS180.id]
        })
        .expect(function(resp) {
            resp.body = {
                size: resp.body.length,
                names: [resp.body[0].name]
            }
        }).expect(200, {size: 1, names: [mike.name]}, done)
    })

    /**
     * Function test query with both major and class
     */
    test('Test search users with both major and class query', done  => {
        let endpoint = "/search/users"
        request(searchAPI)
        .get(endpoint)
        .query({
            major: [walter.major],
            classes: [classes.CS32.id]
        })
        .expect(function(resp) {
            resp.body = {
                size: resp.body.length,
                names: [resp.body[0].name]
            }
        }).expect(200, {size: 1, names: [jesse.name]}, done)
    })
});