const bookings = require("../../../libs/bookings")






exports.module = async () => {
	const allBooking = await bookings.findAllAndPopoulate({}, "rooms");

	allBooking.data.forEach(element => {
		
	});
}