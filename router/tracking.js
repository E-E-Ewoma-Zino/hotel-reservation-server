const express = require("express");
const tracking = require("../controllers/tracking/tracking");

const router = express.Router();

// @desc	GET the most booked room by type
// @route	/tracking/mostbookedroombytype
router.get("/mostBooked", (req, res) => tracking.bookingDetails(req, res));

// @desc	GET all reservations that are coming up
// @route	/tracking/upcomingReservations
router.get("/upcomingReservations", (req, res) => tracking.upcomingReservations(req, res));

// @desc	GET the YYYY-MM-DD for all reserved days
// @route	/tracking/reserved
router.get("/reserved", (req, res) => tracking.reserved(req, res));

module.exports = router;
