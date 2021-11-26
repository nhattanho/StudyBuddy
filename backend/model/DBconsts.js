/**
 * File contains database constants like collections, db name, etc
 * @author Vishnu Devarakonda
 */
 require("dotenv").config();


const DB = {
    DEFAULT_DB_ENDPOINT: process.env.DATABASE_ACCESS,
    name: process.env.DATABASE_NAME,
    test_name: process.env.TEST_DATABASE_NAME,
    collections: {
        User: {
            name: "User"
        },
        BuddyRequest: {
            name: "BuddyRequest"
        },
        Class: {
            name: "Class"
        },
        Major: {
            name: "Major"
        }
    }
}

module.exports = DB
