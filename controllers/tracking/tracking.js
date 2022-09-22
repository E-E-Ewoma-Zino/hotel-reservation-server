// controlls the tracking

const mostBookedRoomByType = require("./module/mostBookedRoom");

class Tracking {
	// for rooms
	async bookingDetails (req, res) {
		const query = req.query;
		const property = query.property === "name"? query.property: "type";
		const custom = Number(query.custom);

		const { status, ...data } = await mostBookedRoomByType(property, custom);
		return res.status(status).json({status, ...data});
	}

	currentlyBookedRoom () {}

	totalRevenueGenerared () {}

	totalRevenueGeneraredByRoomType () {}

	totalRevenueGeneraredByRoomName () {}

	// for users
	frequenceUsers () {}
	nonFrequenceUsers () {}
	usersMostUsedRoom () {}
}

module.exports = new Tracking;