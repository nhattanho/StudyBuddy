    const express = require("express");
const router = express.Router();
const usersModel = require("../model/usersModel");


/**
 * Function returns a filter for searching users
 * @author Vishnu Devarakonda
 * @param {object} queries. contains filters to apply on the search
 * @returns {object} filter. Filter structured to conform to model.find param.
 */
function getUsersFilter(queries) {
    let filter = {};
    for(let qParam in queries){
        filter[qParam] = {$in: queries[qParam]}
    }
    return filter
}

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