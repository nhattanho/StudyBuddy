/**
 * @file Adds the following routes for zoom API:
 * zoom/create
 * @author Chanel Young
 */

 const express = require("express");
 const router = express.Router();
 const bodyParser = require('body-parser');

/**
 * Endpoint for creating a zoom link
 * @author Chanel Young
 * @swagger
 *
 * /zoom/create:
 *   post:
 *     summary: Creates a new zoom link
 *     tags: [Zoom]
 *     description: Creates a new zoom link for a study session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 description: The zoom ID of the user
 *                 example: '@YeahScience!'
 *               starttime:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the study session
 *     responses:
 *       200:
 *         description: Success indicator and error message if request failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     join_url:
 *                       type: string
 *                       description: The url to join the created zoom room
 *                 success:
 *                   type: boolean
 *                   description: Whether or not the request was successful
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: Error message returned by the operation if it failed
 *                   example: "Error message"
 */
router.post("/create", (req, res) => {
    const axios = require('axios');

    const {
        userid, 
        starttime,
    } = req.body;

    //Token expires 11/30
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IndQTUFNZ1ZiUTYtWDhCMTlqTFJBWnciLCJleHAiOjE2MzgyOTkzMDksImlhdCI6MTYzNzY5NDUwOX0.-UjO_dpJdhKgzZUfC78Vmeod1npAWtst6AkjNUAP2c0"
    let _url = `https://api.zoom.us/v2/users/${userid}/meetings`

    const request = {
        method: 'post',
        url: _url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
        }, 
        data: {
            start_time: starttime,
        }
      }


    axios(request)
    .then((response) => {
        res.send({
            success: true, 
            data: response.data,
        });
    })
    .catch(err => {
        res.send({
            success: false, 
            error: err,
        });
    });
});

module.exports = router;