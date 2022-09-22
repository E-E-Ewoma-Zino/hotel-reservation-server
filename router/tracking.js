const express = require("express");
const tracking = require("../controllers/tracking/tracking");

const router = express.Router();

// @desc	GET the most booked room by type
// @route	/tracking/mostbookedroombytype
router.get("/mostBooked", (req, res) => tracking.bookingDetails(req, res));

module.exports = router;
