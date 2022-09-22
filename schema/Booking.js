// The module for the users
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room"
	},
	noOfAdults: Number,
	noOfChildren: Number,
	start: mongoose.Schema.Types.Date,
	end: mongoose.Schema.Types.Date,
	payed: Number,
	// incase the rooms price changes we would know how much it was at the time
	roomPrice: Number
}, { timestamps: true });

module.exports = new mongoose.model("Booking", userSchema);