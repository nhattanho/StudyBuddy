/* =======================================================================*/
/**
* @file This is REST API for class
* @author Vishnu Devarakonda
*/
/* =======================================================================*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The course identifier
 *           example: CS130
 *         name:
 *           type: string
 *           description: The full name of the class
 *           example: Software Engineering
 */

const express = require("express");
const router = express.Router();
const classModel = require("../model/classModel");


/**
 * Function provides an endpoint to get classes by ID
 * @author Vishnu Devarakonda
 * @param {string} id. HTTP query param specifying the ID
 *  of the class to look for.
 * @returns {object} {id: ..., name: ...} class object with id and name
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
 * Endpoint for getting available classes
 * @author Vishnu Devarakonda
 * @swagger
 *
 * /classes/:
 *   get:
 *     summary: Retrieves a page of classes
 *     tags: [Classes]
 *     description: Retrieves a subset of classes based on the page parameter. Each page contains 5 classes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skipC:
 *                 type: integer
 *                 description: The page of class results to retrieve
 *                 example: 1
 *     responses:
 *       200:
 *         description: Array of Class objects from the specified page of results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
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