const express = require("express");
const login = require("../authentication/login");
const register = require("../authentication/register");

const router = express.Router();

// @desc	Login or Register a user
// @route	/auth/user
router.post("/user/login", (req, res, next) => login(req, res, next));
router.post("/user/register", (req, res) => register(req, res));

// @desc	Login or Register a admin
// @route	/auth/admin
router.post("/admin/login", (req, res, next) => login(req, res, next));
router.post("/admin/register", (req, res) => register(req, res));

module.exports = router;
