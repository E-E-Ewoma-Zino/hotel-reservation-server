const alerts = require("../../constants/alerts");
const { deleteBooking } = require("./helper/deleteHelper");

module.exports = (req, res) => {
	const params = req.params.method;

	switch (params) {
		case "remove": deleteBooking (req, res);
			break;
		default: res.status(404).json({ err: "The method you invoke does not exist", alert: alerts.DANGER, data: null });
			break;
	}
}
