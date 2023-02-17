const bookings = require("../../../libs/bookings");
const users = require("../../../libs/users");
const alerts = require("../../../constants/alerts");

module.exports = {
	async newBooking (req, res) {
		const bodyData = req.body;

		if(!bodyData.start || !bodyData.end || bodyData.start === '' || bodyData.end === '') return res.status(400).json({ alert: alerts.DANGER, status: 400, err: "Invalid Request", message: "Correctly fill this form and try again", data: null });
		if(!bodyData.noOfAdults || bodyData.noOfAdults === '') bodyData.noOfAdults = 0;
		if(!bodyData.noOfChildren || bodyData.noOfChildren === '') bodyData.noOfChildren = 0;
		
		try {
			const theUser = await users.findById(bodyData.user);
			
			if (!theUser.err){
				console.log("new bookings", bodyData);
				const { status, alert, err, message, data } = await bookings.create(bodyData);
				res.status(status).json({ alert, status, err, message, data });
			}else {
				res.status(400).json({ alert: alerts.DANGER, status: 400, err: "No User", message: "Failed to create because of no user", data: null });
			}
		} catch (err) {
			console.error("Error in Server:", err);
			res.status(500).json({ err: err, message: "Error in Server", alert: alerts.DANGER });
		}
	}
}