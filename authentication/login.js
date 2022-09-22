// controlls all the authentication for the users
const alert = require("../constants/alerts");
const passport = require("passport");

module.exports = (req, res, next) => {
	console.log("here", req.body);
	// console.log("req", req._parsedOriginalUrl.pathname);
	// LogIn a user
	// I am using the passport custom callback to authenticate the user
	passport.authenticate("local", function (logIn_err, user, info) {
		// if any exceptions happen, come here
		// TODO: Add means to tell the user that the process failed
		if (logIn_err) {
			console.log("::logIn_err:", logIn_err, info.message);
			return res.status(403).json({ err: "Failed authentication user", message: info.message, isLogedIn: false, alert: alert.DANGER, data: user });
		}

		// if user is not found, come here
		if (!user) {
			console.log("NO USER FOUND!", info.message);
			return res.status(403).json({ err: "The user was not found", message: info.message, isLogedIn: false, alert: alert.DANGER, data: user });
		}
		
		// if everything goes well, come here
		req.logIn(user, function (reqLogIn_err) {
			if (reqLogIn_err) {
				console.log("::reqLogIn_err:", reqLogIn_err);
				return res.status(403).json({ err: "Failed to login", message: info.message, isLogedIn: false, alert: alert.DANGER, data: user });
			}

			return res.status(200).json({ err: null, isLogedIn: true, alert: alert.SUCCESS, data: user });
		});
	})(req, res, next);
}