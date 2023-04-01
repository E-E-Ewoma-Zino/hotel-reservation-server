// manipulates the house db
const Rooms = require("../schema/Rooms");
const Edit = require("./edit");

class Room extends Edit {
	constructor(schema) {
		super(schema);
	}
}

module.exports = new Room(Rooms);