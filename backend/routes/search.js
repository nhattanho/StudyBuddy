/* =======================================================================*/
/**
* @file This is REST API for search
* @author Vishnu Devarakonda
*/
/* =======================================================================*/

const express = require("express");
/**
 * Express router for search endpoints
 * @namespace SearchRoutes
 */
const router = express.Router();
const usersModel = require("../model/usersModel");


function getUsersFilter(queries) {
    let filter = {};
    for(let qParam in queries){
        filter[qParam] = {$in: queries[qParam]}
    }
    return filter
}

/**
 * Function provides an endpoint to apply to search for users based on query filters
 *
 * @author Vishnu Devarakonda
 * @name GET/users
 * @function
 * @memberof SearchRoutes
 *
 * @param {object[]} queries. contains filters to apply on the search
 *
 * @returns {object} List of user objects
 */
router.get("/users", (req, res) => {
    let queries = req.query;
    const filter = getUsersFilter(queries);
    usersModel.find(
        filter,
        {
            _id: 1,
            username: 1,
            name: 1,
            about: 1,
            major: 1,
            year: 1,
            classes: 1,
            profileURL: 1,
        },
        function (err, data) {
            if (err) throw err;
            res.json(data);
            return
        }
    );
})


module.exports = router;