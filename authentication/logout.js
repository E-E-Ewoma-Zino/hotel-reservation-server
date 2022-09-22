// controlls all the authentication for the users
const alerts = require("../constants/alerts");

module.exports = (req, res) => {
	req.logOut();
	return res.status(200).json({ err: null, isLogedIn: false, alert: alerts.SUCCESS, data: null });
}