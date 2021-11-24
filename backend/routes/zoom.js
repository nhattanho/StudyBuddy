/**
 * @file Adds the following routes for zoom API:
 * zoom/create
 * @author Chanel Young
 */

 const express = require("express");
 const router = express.Router();
 const bodyParser = require('body-parser');

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