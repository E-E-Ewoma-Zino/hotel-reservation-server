require("dotenv").config();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");
const path = require("path");
const cors = require("cors");

// create app
const app = express();

// @desc	app configs
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));


// session setup
// tell app to use express session
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// set up db
require(__dirname + "/config/db")(mongoose);

// configure passport
require(__dirname + "/config/passport")(passport);

// @desc	for all home route "/"
// @route	home
app.use("/rooms", require(__dirname + "/router/rooms"));
// @desc	for all home route "/"
// @route	/bookings
app.use("/bookings", require(__dirname + "/router/bookings"));
// @desc	for all home route "/"
// @route	tracking
app.use("/tracking", require(__dirname + "/router/tracking"));
// @desc	for all auth route "/"
// @route	/auth
app.use("/auth", require(__dirname + "/router/auth"));
// @desc	404 Page
// app.use(require(__dirname + "/controllers/errors/error404"));

const port = process.env.PORT || 5004;
app.listen(port, ()=> console.log("started app at port " + port));