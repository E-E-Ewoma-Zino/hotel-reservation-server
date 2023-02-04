const moment = require("moment");
const bookings = require("../../../libs/bookings");

module.exports = async () => {
	const { status, alert, err, data: allReservations } = await bookings.findAllAndPopoulate({}, [
		{
			path: "user",
			select: ["firstname"]
		},
		{
			path: "room",
			select: ["type"]
		}
	]);

	const upcoming = allReservations.map(book => {
		const booked = moment(book.start).diff(moment.now(), "day");

		if (booked < 0) {
			console.log("skiped", book, booked);
			return;
		}

		return book;
	});

	return { alert, status, err, message: "Returned all upcoming Reservations", data: upcoming };
}