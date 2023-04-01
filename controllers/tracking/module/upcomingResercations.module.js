const _ = require("lodash");
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

	const upcoming = allReservations.filter(book => {
		const booked = moment(book.start).diff(moment.now(), "day");

		if (booked < 0) return 0;

		return book;
	});

	const myOrderedArray = _.sortBy(upcoming, o => moment(o.start).diff(moment.now(), "day"));
	
	return { alert, status, err, message: "Returned all upcoming Reservations", data: myOrderedArray };
}