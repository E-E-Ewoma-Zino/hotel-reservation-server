// The module for the users
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: String,
	title: String,
	description: String,
	price: Number,
	type: String,
	images: Array,
	videos: Array,
	features: Array,
	isAvaliable: {
		type: Boolean,
		default: true
	}
}, { timestamps: true });

module.exports = new mongoose.model("Room", userSchema);