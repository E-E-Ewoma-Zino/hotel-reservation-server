// controlls the tracking

const alerts = require("../../constants/alerts");
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

	async allReservedRooms () { 
		try {
			const { status, ...body } = await filteredRoomsByType();
			res.status(status).json({ status, ...body });
		} catch (err) {
			console.error("Error getting upcoming reservations Server:", err);
			res.status(500).json({ err: err, message: "Error getting upcoming reservations Server", alert: alerts.DANGER });
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