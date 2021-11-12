/* =======================================================================*/
/**
* @file This is REST API for class
* @author Vishnu Devarakonda
*/
/* =======================================================================*/
const express = require("express");
const router = express.Router();
const classModel = require("../model/classModel");


/**
 * Function provides an endpoint to get classes by ID
 * @author Vishnu Devarakonda
 * @param {string} id. HTTP query param specifying the ID
 *  of the class to look for.
 * @returns {Object} {id: ..., name: ...} class object with id and name
 */
router.get("/name", (req, res) => {
    let classID = req.query.id
    classModel.find(
        {id: classID},
        {_id: 0, id: 1, name: 1},
        (err, data) => {
            if (err) throw err;
            res.send(data[0]);
            return;
        })
})


/**
 * Function provides a root endpoint to get the available classes
 * @author Vishnu Devarakonda
 * @param {int} skipC. HTTP query param specifying the page to get.
 *  (ex. 1,2,3..)
 * @returns {List[Object]} List of class objects.
 */
router.get("/", (req, res) => {
    let skipC = req.query.skipC
    classModel.find(
        {},
        {_id: 0, id: 1, name: 1, },
        { skip: 5*skipC, limit: 5 },
        (err, data) => {
            if (err) throw err;
            res.send(data);
            return;
        }
    )
})

module.exports = router;