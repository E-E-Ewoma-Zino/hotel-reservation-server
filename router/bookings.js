const express = require("express");
const getReq = require("../controllers/bookings/get");
const patchReq = require("../controllers/bookings/patch");
const postReq = require("../controllers/bookings/post");
const deleteReq = require("../controllers/bookings/delete");

const router = express.Router();

// @desc	Home Router
router.route("/:method")
.get((req, res) => getReq(req, res))
// @desc	Home Router
.post((req, res) => postReq(req, res))
// @desc	Home Router
.patch((req, res) => patchReq(req, res))
// @desc	Home Router
.delete((req, res) => deleteReq(req, res));

module.exports = router;