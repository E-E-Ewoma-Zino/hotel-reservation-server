const alerts = require("../../constants/alerts");
const { updateRoom } = require("./helper/patchHelper");

module.exports = (req, res) => {
	const params = req.params.method;

	switch (params) {
		case "update": updateRoom(req, res);
			break;
		default:
			res.status(404).json({ err: "The method you invoke does not exist", alert: alerts.DANGER, data: null });
			break;
	}
}
