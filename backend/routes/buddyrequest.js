/**
 * @file Adds the following routes for buddy request API:
 * buddyrequest/create
 * buddyrequest/delete
 * buddyrequest/accept 
 * @author Chanel Young
 */

const express = require("express");
const router = express.Router();
const BuddyRequestModel = require("../model/BuddyRequestModel");

router.post("/create", (req, res) => {
    console.log("Creating buddy request");
    const {
        sender,
        receiver,
        dateslots,
    } = req.body;
    //console.log("body", req.body);

    const buddyRequest = new BuddyRequestModel({
        sender: sender,
        receiver: receiver,
        status: "Pending",
        dateslots: dateslots,
    });

    buddyRequest
    .save()
    .then((result) => {
        //console.log(result);
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