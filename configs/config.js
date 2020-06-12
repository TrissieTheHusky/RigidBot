const Config = require("../config.js");

module.exports = rigidbot => {
	return class Conf extends Config {
		constructor() {
			super("./configs/data/config.json");
		}
		setup() {
			this.create("symbol", "$");
			this.create("xp-delay", 15000);
			this.create("xp-section-divider", 3);
			this.create("xp-rarity-gap", 0.4);
			this.create("xp-goal-rate", 29);
			this.create("xp-goal-base", 3);
			this.create("xp-item-rate", 16);
			this.create("xp-coin-rate", 32);
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