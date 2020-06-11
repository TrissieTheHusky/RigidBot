const Config = require("../config.js");

module.exports = rigidbot => {
	return class Conf extends Config {
		constructor() {
			super("./configs/data/config.json");
		}
		setup() {
			this.create("symbol", "$");
			this.create("color", "error", 0xFF0000);
			this.create("color", "info", 0xFF00FF);
			this.create("color", "warn", 0xFFFF00);
			this.create("color", "stat", 0x00FFFF);
			this.create("color", "done", 0x00FF00);
		}
		color(name) {
			return this.get("color", name);
		}
	}
};