// the function that makes the call
const rooms = require("../../../libs/rooms");
const alerts = require("../../../constants/alerts");

module.exports = {
	async all(req, res) {
		const query = req.query.type;
		try {
			const { status, err, message, data, alert } = await rooms.findAll(query === ''? {}: {type: req.query.type});
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	},
	
	async byId(req, res) {
		try {
			const { status, err, message, data, alert } = await rooms.findById(req.query.id);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	},
	
	async allAndPopulate(req, res) {
		try {
			const { status, err, message, data, alert } = await rooms.findAllAndPopoulate({}, req.query.opt);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	},
	
	async byIdAndPopulate(req, res) {
		try {
			const { status, err, message, data, alert } = await rooms.findByIdAndPopulate(req.query.id, req.query.opt);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	}
}
