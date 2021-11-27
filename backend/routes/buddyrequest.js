/**
 * @file This is REST API for buddy requests
 * @author Chanel Young
 */

const express = require("express");
/**
 * Express router for buddy request endpoints
 * @namespace BuddyRequestRoutes
 */
const router = express.Router();
const bodyParser = require('body-parser');

const BuddyRequestModel = require("../model/BuddyRequestsModel");

/**
 * Endpoint for creating a new buddy request
 *
 * @author Chanel Young
 * @name POST/create
 * @function
 * @memberof BuddyRequestRoutes
 *
 * @param {string} sender - The MongoDB object ID of the sender user
 * @param {string} receiver - The MongoDB object ID of the receiver user
 * @param {Date[]} dateslots - Array of date objects representing proposed start/end times for session
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
router.post("/create", (req, res) => {
    const {
        sender,
        receiver,
        dateslots,
    } = req.body;

    const buddyRequest = new BuddyRequestModel({
        sender: sender,
        receiver: receiver,
        status: "Pending",
        dateslots: dateslots,
    });

    buddyRequest
    .save()
    .then((result) => {
      res.send({
        success: true,
        request: result,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        error: err,
      });
    });
});

/**
 * Endpoint for deleting a buddy request
 *
 * @author Chanel Young
 * @name DELETE/:id
 * @function
 * @memberof BuddyRequestRoutes
 *
 * @param {string} id - The MongoDB object ID of the request
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} err - Error message if request failed
 */
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    BuddyRequestModel.findOneAndRemove({ _id: id }, (err, buddyrequest) => {
      console.log(buddyrequest);
      if (err) {
        res.send({
          success: false
        });
      }
      else if (buddyrequest) {
        res.send({
          success: true
        });
      } else {
        res.send({
          success: false,
          error: err,
        });
      }
    });
  });

/**
 * Endpoint for accepting a new buddy request
 *
 * @author Chanel Young
 * @name POST/accept
 * @function
 * @memberof BuddyRequestRoutes
 *
 * @param {string} id - The MongoDB object ID of the request
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
router.post("/accept", (req, res) => {
    const {
        id,
    } = req.body;
    BuddyRequestModel.findOneAndUpdate({ _id: id }, {status: "Accepted"}, {
    new: true,
    })
    .exec()
    .then((data) => {
        res.send({
          success: true
        });
    })
    .catch((err) => {
        res.send({
          success: false,
          error: err
        });
    });
});

/**
 * Endpoint for getting all requests sent by a user with given id
 *
 * @author Chanel Young
 * @name GET/:id/sent
 * @function
 * @memberof BuddyRequestRoutes
 *
 * @param {string} id - The MongoDB object ID of the user
 *
 * @returns {object[]} buddyrequests - Array of Buddy Request objects containing all requests send by user
 * @returns {boolean} success - Whether the request was successful of not
 */
router.get("/:id/sent", async (req, res) => {
    const { id } = req.params;

    BuddyRequestModel.find({ sender: id }, async (err, buddyrequests) => {
        res.send({
          success: true,
          buddyrequests: buddyrequests,
        });
    });
});

/**
 * Endpoint for getting all requests received by a user with given id
 *
 * @author Chanel Young
 * @name GET/:id/received
 * @function
 * @memberof BuddyRequestRoutes
 *
 * @param {string} id - The MongoDB object ID of the user
 *
 * @returns {object[]} buddyrequests - Array of Buddy Request objects containing all requests received by user
 * @returns {boolean} success - Whether the request was successful of not
 */
router.get("/:id/received", async (req, res) => {
    const { id } = req.params;
    BuddyRequestModel.find({ receiver: id }, async (err, buddyrequests) => {
      res.send({
        success: true,
        buddyrequests: buddyrequests,
        });
    });
});


module.exports = router;