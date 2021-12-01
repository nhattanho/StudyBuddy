/* =======================================================================*/
/**
* @file This is REST API for major
* @author Vishnu Devarakonda
*/
/* =======================================================================*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Major:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The major identifier
 *           example: 1
 *         name:
 *           type: string
 *           description: The full name of the major
 *           example: Chemistry
 */

const express = require("express");
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
 * Endpoint for getting available majors
 * @author Vishnu Devarakonda
 * @swagger
 *
 * /majors/:
 *   get:
 *     summary: Retrieves all available majors
 *     tags: [Majors]
 *     description: Retrieves all majors that are available in the system
 *     responses:
 *       200:
 *         description: Array of all available Major objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Major'
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