// manipulates the db
const mongoose = require("mongoose");
const alerts = require("../constants/alerts");

class Edit {
	constructor(schema) {
		// this.schema = schema;
		let _schema = schema;
		// this.setSchema = function(schema) { _schema = schema; }
		this.getSchema = function () { return _schema; }
	}

	async findById(schemaId, callback) {
		try {
			if (!schemaId || !mongoose.isValidObjectId(schemaId)) return { status: 403, alert: alerts.WARNING, message: "Invalid request using id of " + schemaId, err: "Invalid Request!", data: null };

			const item = await this.getSchema().findById({ _id: schemaId }).exec(callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not find item with id " + schemaId, err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found item with id " + schemaId, err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to findById:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to findById", err: err.message, data: null };
		}
	}

	async findAllAndPopoulate(opt = {}, populateOpt = "", callback) {
		try {
			const item = await this.getSchema().find(opt).populate(populateOpt).exec(callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not findAllAndPopoulate item with opt " + populateOpt, err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found item with opt " + populateOpt, err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to findAllAndPopoulate:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to findAllAndPopoulate", err: err.message, data: null };
		}
	}

	async findByIdAndPopulate(schemaId, populateOpt = "", callback) {
		try {
			if (!schemaId || !mongoose.isValidObjectId(schemaId)) return { status: 403, alert: alerts.WARNING, message: "Invalid request using id of " + schemaId, err: "Invalid Request!", data: null };

			const item = await this.getSchema().findById({ _id: schemaId }).populate(populateOpt).exec(callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not findByIdAndPopoulate item with id " + schemaId, err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found item with id " + schemaId, err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to findByIdAndPopoulate:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to findByIdAndPopoulate", err: err.message, data: null };
		}
	}

	async findAll(opt = {}, callback) {
		try {
			const item = await this.getSchema().find(opt, callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not findAll", err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found items", err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to findAll:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to findAll", err: err.message, data: null };
		}
	}

	async aggregate(agg = {}, callback) {
		try {
			const item = await this.getSchema().aggregate(agg, callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not aggregate", err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found items", err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to aggregate:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to aggregate", err: err.message, data: null };
		}
	}

	async create(data = {}, callback) {
		try {
			const item = await this.getSchema().create(data, callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not create", err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found items", err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to create:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to create", err: err.message, data: null };
		}
	}

	async remove(schemaId, callback) {
		try {
			const item = await this.getSchema().deleteOne({ _id: schemaId }, callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not remove", err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found items", err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to remove:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to remove", err: err.message, data: null };
		}
	}

	// update an item
	async update({ itemToupdateId, propertyToUpdate = "", optionsToUse = "", updateValue = "" }, callback) {
		try {
			if (!itemToupdateId._id || !mongoose.isValidObjectId(itemToupdateId._id)) return { status: 403, alert: alerts.WARNING, message: "Invalid request using id of " + itemToupdateId, err: "Invalid Request!", data: null };

			const item = await this.getSchema().findOneAndUpdate(itemToupdateId, { [optionsToUse]: { [propertyToUpdate]: updateValue } }, callback);

			if (!item) return { status: 404, alert: alerts.DANGER, message: "Could not update", err: "Not found!", data: null };

			return { status: 200, alert: alerts.SUCCESS, message: "Found items", err: null, data: item };
		} catch (err) {
			console.error("Server Error! Failed to update:", err);
			return { status: 500, alert: alerts.DANGER, message: "Server Error! Failed to update", err: err.message, data: null };
		}
	}
}

module.exports = Edit;