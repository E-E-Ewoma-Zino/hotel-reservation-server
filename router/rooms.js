const express = require("express");
const getReq = require("../controllers/rooms/get");
const patchReq = require("../controllers/rooms/patch");
const postReq = require("../controllers/rooms/post");
const deleteReq = require("../controllers/rooms/delete");
const uploads = require("../config/multer");

const router = express.Router();

// @desc	Home Router
router.route("/:method")
.get((req, res) => getReq(req, res))
// @desc	Home Router
.post(uploads.fields([{ name: "images" }, { name: "videos" }]), (req, res) => postReq(req, res))
// @desc	Home Router
.patch(uploads.fields([{ name: "images" }, { name: "videos" }]), (req, res) => patchReq(req, res))
// @desc	Home Router
.delete((req, res) => deleteReq(req, res));

module.exports = router;