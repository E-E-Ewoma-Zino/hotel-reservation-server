const rooms = require("../../../libs/rooms");
const alerts = require("../../../constants/alerts");

module.exports = {
	async createRoom (req, res) {
		const bodyData = {...req.body, images: req.files.images, videos: req.files.videos};
		console.log(req.files);
		try {
			bodyData.features = bodyData.features.split(',');
			console.log("new rooms", bodyData);
			const { status, alert, err, message, data } = await rooms.create(bodyData);
			res.status(status).json({ alert, status, err, message, data });
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	}
}