const alerts = require("../../../constants/alerts");
const doUpdateRoom = require("./module/doUpdateRoom");

module.exports = {
	async updateRoom (req, res) {
		const bodyData = {...req.body, images: req.files.images, videos: req.files.videos};
		
		try {
			console.log("update room data", bodyData);
			const { status, alert, err, message, data } = await doUpdateRoom(bodyData);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	}
}