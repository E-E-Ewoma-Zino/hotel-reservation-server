const bookings = require("../../../libs/bookings");
const alerts = require("../../../constants/alerts");

module.exports = {
	async deleteBooking (req, res) {
		const bodyData = req.body;
		try {
			console.log("new booking", bodyData);
			const { status, alert, err, message, data } = await bookings.remove(bodyData.id);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	}
}