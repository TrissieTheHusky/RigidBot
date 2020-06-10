const Config = require("../config.js");

module.exports = rigidbot => {
	return class Users extends Config {
		constructor() {
			super("./configs/data/users.json");
		}
		user(id) {
			this.create(id, "balance", 0);
			this.create(id, "backpack", "space", 64);
			this.create(id, "backpack", "items", []);
		}
	}
};