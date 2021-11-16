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
    .then((res) => {
        console.log("successfully created!");
    })
    .catch((err) => {
        console.log("can not save new buddyrequest: ", err);
    });
    console.log("hello!")
});

//Delete
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    BuddyRequestModel.findOneAndRemove({ _id: id }, (err, buddyrequest) => {
      console.log(buddyrequest);
      if (err) {
        console.log(err)
      }
      if (buddyrequest) {
        console.log("deleted successfully")
      } else {
        console.log("failed to delete")
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
    })
    .catch((err) => {
        console.log("update fail in backend log");
    });
});

//Get all requests sent by user with given id
router.get("/:id/sent", async (req, res) => {
    const { id } = req.params;

    BuddyRequestModel.find({ sender: id }, async (err, buddyrequests) => {
      console.log("buddyrequests", buddyrequests);
      if (buddyrequests.length != 0) {
        console.log("Wooo found some buddyrequests!");
      } else {
        console.log("No buddyrequests to display!");
      }
    });
});

//Get all requests received by user with given id
router.get("/:id/received", async (req, res) => {
    const { id } = req.params;

    BuddyRequestModel.find({ receiver: id }, async (err, buddyrequests) => {
      console.log("buddyrequests", buddyrequests);
      if (buddyrequests.length != 0) {
        console.log("Wooo found some buddyrequests!")
      } else {
        console.log("No buddyrequests to display!");
      }
    });
});


module.exports = router;