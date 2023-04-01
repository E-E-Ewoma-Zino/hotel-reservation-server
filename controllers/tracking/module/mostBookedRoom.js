// get tbe most Booked Rooms by Type
const moment = require("moment");
const alerts = require("../../../constants/alerts");
const bookings = require("../../../libs/bookings");

module.exports = async (property, customFreq) => {
	const booking = await bookings.findAllAndPopoulate({}, {
		path: "room",
		select: ["name", "type", "price"]
	});

	if (booking.err) return booking;

	// create an array to sore the room type and the number of times it has been booked 
	const mostBooked = [{
		[property]: "***Default***",
		[property === "name" && "type"]: "",
		inc: 0,
		room: [{
			createdAt: null,
			paied: 0
		}],
		frequency: {
			weekly: {
				count: 0,
				saleValue: 0,
				when: []
			},
			monthly: {
				count: 0,
				saleValue: 0,
				when: []
			},
			custom: {
				count: 0,
				saleValue: 0,
				when: []
			}
		}
	}];

	// check eack booking and save the booking type. if the type occures again it would be incremented
	booking.data.forEach(book => {
		for (let i = 0; i < mostBooked.length; i++) {
			const val = mostBooked[i];
			// here we only add to the mostBooked array if the loop reach the ending.
			// But as it gets to the ending if the loop sees that an item in the booking 
			// arr is already in the mostBooked array the it will increament the inc
			// and add the time it was booked and the paied value.
			if (val[property].toLowerCase() === book.room[property].toLowerCase()) {
				val.inc = val.inc + 1;
				val.room.push({ createdAt: book.createdAt, paied: book.payed });
				break;
			} else {
				if (i >= mostBooked.length - 1) {
					mostBooked.push({
						[property]: book.room[property],
						inc: 1,
						room: [{ createdAt: book.createdAt, paied: book.payed }],
						[property === "name" && "type"]: book.room.type,
						frequency: {
							weekly: {
								count: 1,
								saleValue: book.payed,
								when: [book.createdAt]
							},
							monthly: {
								count: 1,
								saleValue: book.payed,
								when: [book.createdAt]
							},
							custom: {
								count: 1,
								saleValue: book.payed,
								when: [book.createdAt]
							}
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
		for (let j = book.room.length - 1; j > 0; j--) {
			const created = book.room[book.room.length - 1].createdAt;
			const roomPrice = book.room[j].paied;
			const prevCreated = book.room[j - 1].createdAt;

			const diff = dateDifference(created, prevCreated);

			// weekly freq
			if (diff < 7) {
				book.frequency.weekly.count += 1;
				book.frequency.weekly.when.push(created);
				book.frequency.weekly.saleValue += roomPrice;
			}

			// monthly freq
			if (diff < 31) {
				book.frequency.monthly.count += 1;
				book.frequency.monthly.when.push(created);
				book.frequency.monthly.saleValue += roomPrice;
			}

			// custom freq
			if (customFreq && !isNaN(customFreq) && diff < customFreq) {
				book.frequency.custom.count += 1;
				book.frequency.custom.when.push(created);
				book.frequency.custom.saleValue += roomPrice;
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