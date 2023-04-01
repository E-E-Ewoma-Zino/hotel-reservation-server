// manipulates the house db
const Users = require("../schema/Users");
const Edit = require("./edit");

class User extends Edit {
	constructor(schema) {
		super(schema);
	}
}

module.exports = new User(Users);