// controlls all the authentication for the users
const alert = require("../constants/alerts");
const Users = require("../schema/Users");
const passport = require("passport");

module.exports = (req, res) => {

	const { password, ...body } = req.body;
	console.log("res", req.body)

	const pathname = req._parsedOriginalUrl.pathname;

	// make sure that authLevel can't be canged from the client side
	if (pathname == "/agent/register") body.authLevel = 1;
	else body.authLevel = 0;

	// console.log("body", password, body);
	// Here the user is being created and the authLevel is set to 1 to give user auth to agent pages
	Users.register(body, password, (register_err, user) => {
		if (register_err) {
			console.log(":::register_err", register_err);
			return res.status(403).json({ err: "Failed authentication user", message: register_err.message, isLogedIn: false, alert: alert.DANGER, data: user });
		} else {
			passport.authenticate("local")(req, res, () => {
				return res.status(200).json({ err: null, isLogedIn: true, alert: alert.SUCCESS, data: user });
			});
		}
	});
}