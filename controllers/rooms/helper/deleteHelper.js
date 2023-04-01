const alerts = require("../../../constants/alerts");
const doDeleteMedia = require("./module/doDeleteMedia");
const doDeleteRoom = require("./module/doDeleteRoom");

module.exports = {
	async deleteRoom (req, res) {
		const bodyData = req.body;
		try {
			console.log("Delete roomId", bodyData);
			const { status, alert, err, message, data } = await doDeleteRoom({ roomId: bodyData.id });
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	},

	async deleteRoomMeida (req, res) {
		const bodyData = req.body;
		try {
			console.log("Delete room media", bodyData);
			const { status, alert, err, message, data } = await doDeleteMedia(bodyData);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: err.message || "Error in Server", alert: err.alert || alerts.DANGER });
		}
	}
}