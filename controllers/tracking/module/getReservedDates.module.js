const _ = require("lodash");
const moment = require("moment");
const { ObjectId } = require("mongodb");
const bookings = require("../../../libs/bookings");

/**
 * This function is to get an array of dates in YYYY-MM-DD format that has already been reserved
 * @returns alert, status, err, message, data
*/
module.exports = async function (roomId) {
	const { status, alert, err, data: allBooking } = await bookings.findAll({});
	const compare = new ObjectId(roomId);
	const reserved = []; // contains all dates

	console.log("=========== All reservations ===========");

	// loop eacd reservations
	allBooking.forEach(book => {
		console.log("compare", compare.equals(book.room));
		// We are sending this reserve date for only the room that is presented
		if (compare.equals(book.room)) {
			console.log("book", book.room, "===", roomId, compare.equals(book.room));

			console.log("First booking", book.start, book.end);
			// add the check in date(start date)
			reserved.push(moment(book.start).subtract(1, "days").format("YYYY-MM-DD"));
			console.log("Pushed the start booking", moment(book.start).subtract(1, "days").format("YYYY-MM-DD"));
			console.log("Array contains", reserved);
			// get the difference between the start and end dates and use the difference 
			// to know how many times the looop will add to the start day eg. 2023-02-17, 2023-02-18, 2023-02-19
			// till it reaches the end date
			console.log("Loop from 0 to", moment(book.end).diff(book.start, "days"));
			for (let i = 0; i < moment(book.end).diff(book.start, "days"); i++) {
				console.log("Add date inbetween", moment(book.start).add(i, "days").format("YYYY-MM-DD"));
				reserved.push(moment(book.start).add(i, "days").format("YYYY-MM-DD"));
				console.log("Current Array", reserved);
			}
			// add the check out date(end date)
			// console.log("Pushed end date", moment(book.end).format("YYYY-MM-DD"));
			// reserved.push(moment(book.end).format("YYYY-MM-DD"));
			console.log("Final array contains", reserved);

		}
		else {
			console.log("book not equal", book.room, roomId, compare.equals(book.room));
		}
	});

	console.log("removed duplicates", _.uniqBy(reserved));
	console.log("all this for roomId", roomId);

	return { alert, status, err, message: "All dates that should be disabled", data: _.uniqBy(reserved) };
}