// get tbe most Booked Rooms by Type
const moment = require("moment");
const alerts = require("../../../constants/alerts");
const bookings = require("../../../libs/bookings");

module.exports = async (property, customFreq) => {
	const booking = await bookings.findAllAndPopoulate({}, "room");
	if (booking.err) return booking;

	// create an array to sore the room type and the number of times it has been booked 
	const mostBooked = [{
		[property]: "***Default***",
		inc: 0,
		createdAt: [],
		frequency: {
			weekly: 0,
			monthly: 0,
			custom: 0
		}
	}];

	// check eack booking and save the booking type. if the type occures again it would be incremented
	booking.data.forEach(book => {
		for(let i = 0; i < mostBooked.length; i++){
			const val = mostBooked[i];
			if (val[property].toLowerCase() === book.room[property].toLowerCase()) {
				val.inc = val.inc + 1;
				val.createdAt.push(book.createdAt);
				break;
			} else {
				if (i >= mostBooked.length - 1) {
					mostBooked.push({
						[property]: book.room[property],
						inc: 1,
						createdAt: [book.createdAt],
						frequency: {
							weekly: 1,
							monthly: 1,
							custom: 1
						}
					});
					break;
				}
			}
		};
	});

	for (let i = 0; i < mostBooked.length; i++) {
		const book = mostBooked[i];
		
		// v(book.createdAt[book.createdAt.length - 1], book.createdAt[book.createdAt.length - 2])
		for (let j = book.createdAt.length - 1; j > 0; j--) {
			const created = book.createdAt[book.createdAt.length - 1];
			const prevCreated = book.createdAt[j - 1];
			
			const diff = dateDifference(created, prevCreated);

			// weekly freq
			if(diff < 7){
				book.frequency.weekly += 1;
			}

			// monthly freq
			if(diff < 31){
				book.frequency.monthly += 1;
			}

			// custom freq
			if(customFreq && !isNaN(customFreq) && diff < customFreq){
				book.frequency.custom += 1;
			}
		}
	}

	function dateDifference(latestDate, prevDate) {
		if (!latestDate) return NaN;
		if (!prevDate) return NaN;

		prevDate = moment(prevDate);
		latestDate = moment(latestDate);
		return moment.duration(latestDate.diff(prevDate)).asDays();
	}

	// remove the dummy default data
	mostBooked.shift();
	return { message: "The most booked rooms by room " + [property], err: null, status: 200, alert: alerts.SUCCESS, data: mostBooked };
}