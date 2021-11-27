/* =======================================================================*/
/**
* @file This is REST API for major
* @author Vishnu Devarakonda
*/
/* =======================================================================*/
const express = require("express");
/**
 * Express router for major endpoints
 * @namespace MajorRoutes
 */
const router = express.Router();
const majorModel = require("../model/majorModel");


/**
 * Function provides an endpoint to get classes by ID
 * @author Vishnu Devarakonda
 * @param {string} id. HTTP query param specifying the ID
 *  of the major to look for.
 * @returns {object} {id: ..., name: ...} major object with id and name
 */
router.get("/name", (req, res) => {
    let majorID = req.query.id
    majorModel.find(
        {id: majorID},
        {_id: 0, id: 1, name: 1},
        (err, data) => {
            if (err) throw err;
            res.send(data[0]);
            return;
        })
})


/**
 * Function provides a root endpoint to get the available classes
 *
 * @author Vishnu Devarakonda
 * @name GET/
 * @function
 * @memberof MajorRoutes
 *
 * @returns {object[]} List of major objects.
 */
router.get("/", (req, res) => {
    majorModel.find(
        {},
        {_id: 0, id: 1, name: 1, },
        (err, data) => {
            if (err) throw err;
            res.send(data);
            return;
        }
    )
})

module.exports = router;