/**
 * @file Adds the following routes for buddy request API:
 * buddyrequest/create
 * buddyrequest/delete
 * buddyrequest/accept 
 * @author Chanel Young
 */

const express = require("express");
const router = express.Router();
const BuddyRequestModel = require("../model/BuddyRequestsModel");

//Create
router.post("/create", (req, res) => {
    console.log("Creating buddy request");
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
        message: "BuddyRequest successfully added!",
        action: "added",
        });
    })
    .catch((err) => {
        console.log("can not save new buddyrequest: ", err);
        res.send({ success: false, message: err });
    });
});

//Delete
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    BuddyRequestModel.findOneAndRemove({ _id: id }, (err, buddyrequest) => {
      console.log(buddyrequest);
      if (err) {
        res.send({
          success: false,
          message: err,
        });
      }
      if (buddyrequest) {
        res.send({
          success: true,
          message: "Deleted Successfully!",
          action: "deleted",
        });
      } else {
        res.send({
          success: false,
          message: "Deleted Failed!",
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
        console.log("Accepted BuddyRequest", data);
        res.send({
        success: true,
        message: "BuddyRequest Accepted",
        action: "accepted",
        });
    })
    .catch((err) => {
        console.log("update fail in backend log");
        res.send({
        success: false,
        message: "BuddyRequest accept failed",
        });
    });
});

//Get all requests sent by user with given id
router.get("/:id/sent", async (req, res) => {
    const { id } = req.params;

    BuddyRequestModel.find({ sender: id }, async (err, buddyrequests) => {
      console.log("buddyrequests", buddyrequests);
      if (buddyrequests.length != 0) {
        res.send({ success: true, message: "Success!", buddyrequests: buddyrequests });
      } else {
        console.log("No buddyrequests to display!");
        res.send({
          success: false,
          message: "You have not have any buddyrequests!",
        });
      }
    });
});

//Get all requests received by user with given id
router.get("/:id/sent", async (req, res) => {
    const { id } = req.params;

    BuddyRequestModel.find({ receiver: id }, async (err, buddyrequests) => {
      console.log("buddyrequests", buddyrequests);
      if (buddyrequests.length != 0) {
        res.send({ success: true, message: "Success!", buddyrequests: buddyrequests });
      } else {
        console.log("No buddyrequests to display!");
        res.send({
          success: false,
          message: "You have not have any buddyrequests!",
        });
      }
    });
});


module.exports = router;