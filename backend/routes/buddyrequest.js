/**
 * @file Adds the following routes for buddy request API:
 * buddyrequest/create
 * buddyrequest/delete
 * buddyrequest/accept 
 * @author Chanel Young
 */

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const BuddyRequestModel = require("../model/BuddyRequestsModel");

//Create
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

//Delete
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

//Accept
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

//Get all requests sent by user with given id
router.get("/:id/sent", async (req, res) => {
    const { id } = req.params;

    BuddyRequestModel.find({ sender: id }, async (err, buddyrequests) => {
        res.send({
          success: true,
          buddyrequests: buddyrequests,
        });
    });
});

//Get all requests received by user with given id
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