// manipulates the house db
const Bookings = require("../schema/Booking");
const Edit = require("./edit");

class Booking extends Edit {
	constructor(schema) {
		super(schema);
	}
}

module.exports = new Booking(Bookings);