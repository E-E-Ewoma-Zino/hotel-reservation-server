// the function that makes the call
const bookings = require("../../../libs/bookings");
const alerts = require("../../../constants/alerts");

module.exports = {
	async all(req, res) {
		try {
			const { status, err, message, data, alert } = await bookings.findAll();
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	},
	
	async byId(req, res) {
		try {
			const { status, err, message, data, alert } = await bookings.findById(req.query.id);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	},
	
	async allAndPopulate(req, res) {
		try {
			const { status, err, message, data, alert } = await bookings.findAllAndPopoulate({}, req.query.opt);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	},
	
	async byIdAndPopulate(req, res) {
		try {
			const { status, err, message, data, alert } = await bookings.findByIdAndPopulate(req.query.id, req.query.opt);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	}
}
