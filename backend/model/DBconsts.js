/**
 * File contains database constants like collections, db name, etc
 * @author Vishnu Devarakonda
 */


const DB = {
    DEFAULT_DB_ENDPOINT: 'mongodb://localhost:27017',
    name: 'studybuddy',
    collections: {
        users: {
            name: "users"
        },
        buddyrequests: {
            name: "buddyrequests"
        }
    }
}


module.exports = DB