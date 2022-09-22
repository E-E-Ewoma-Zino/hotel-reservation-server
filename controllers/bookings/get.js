// api
const alerts = require("../../constants/alerts");
const { all, byId, allAndPopulate, byIdAndPopulate } = require("./helper/getterHelper");

module.exports = (req, res) => {
	const params = req.params.method;

	switch (params) {
		case "all": all(req, res);
			break;
		case "id": byId(req, res);
			break;
		case "populated": allAndPopulate(req, res);
			break;
		case "populatedId": byIdAndPopulate(req, res);
			break;
		default:
			res.status(404).json({ err: "Not found!", message: "The path " + params + " does not exist", alert: alerts.DANGER, data: null });
			break;
	}
}