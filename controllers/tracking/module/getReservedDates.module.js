const _ = require("lodash");
const moment = require("moment");
const bookings = require("../../../libs/bookings");

// This function is to get an array of dates in YYYY-MM-DD format that has already been reserved
module.exports = async function () {
	const  { status, alert, err, data: allBooking } = await bookings.findAll({});

	const reserved = []; // contains all dates
	
	// loop eacd reservations
	allBooking.forEach(book => {
		// add the check in date(start date)
		reserved.push(moment(book.start).format("YYYY-MM-DD"));
		// get the difference between the start and end dates and use the difference 
		// to know how many times the looop will add to the start day eg. 2023-02-17, 2023-02-18, 2023-02-19
		// till it reaches the end date
		for (let i = 0; i < moment(book.end).diff(book.start, "days"); i++) {
			reserved.push(moment(book.start).add(i, "days").format("YYYY-MM-DD"));
		}
		// add the check out date(end date)
		reserved.push(moment(book.end).format("YYYY-MM-DD"));
	});

	return { alert, status, err, message: "All dates that should be disabled", data: _.uniqBy(reserved) };
}