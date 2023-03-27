// controlls the tracking

const alerts = require("../../constants/alerts");
const getReservedDatesModule = require("./module/getReservedDates.module");
const mostBookedRoomByType = require("./module/mostBookedRoom");
const upcomingResercationsModule = require("./module/upcomingResercations.module");

class Tracking {
	// for rooms
	async bookingDetails(req, res) {
		const query = req.query;
		const property = query.property === "name" ? query.property : "type";
		const custom = Number(query.custom);

		const { status, ...data } = await mostBookedRoomByType(property, custom);
		return res.status(status).json({ status, ...data });
	}

	async upcomingReservations(req, res) {
		try {
			const { status, ...body } = await upcomingResercationsModule();
			res.status(status).json({ status, ...body });
		} catch (err) {
			console.error("Error getting upcoming reservations Server:", err);
			res.status(500).json({ err: err, message: "Error getting upcoming reservations Server", alert: alerts.DANGER });
		}
	}

	async reserved (req, res) {
		try {
			console.log("room id", req.query)
			const { status, ...body } = await getReservedDatesModule(req.query.roomId);
			res.status(status).json({ status, ...body });
		} catch (err) {
			console.error("Error getting reserved dates:", err);
			res.status(500).json({ err: err.message, message: "Error getting reserved dates", alert: alerts.DANGER });
		}
	}

	totalRevenueGenerared() { }

	totalRevenueGeneraredByRoomType() { }

	totalRevenueGeneraredByRoomName() { }

	// for users
	frequenceUsers() { }
	nonFrequenceUsers() { }
	usersMostUsedRoom() { }
}

module.exports = new Tracking;