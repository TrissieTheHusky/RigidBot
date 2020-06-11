const Config = require("../config.js");

module.exports = rigidbot => {
	return class Logs extends Config {
		
		constructor() {
			super("./configs/data/logs.json");
		}
		
		setup() {
			this.create("joins", []);
			this.create("leaves", []);
			this.create("member-joins", []);
			this.create("member-leaves", []);
		}
		
		user(guild, user) {
			this.create("history", guild, user, []);
		}
		
		logHistory(guild, user, type, reason, duration) {
			rigidbot.configs.guilds.guild(guild);
			this.user(guild, user);
			this.get("history", guild, user).unshift({
				type, reason, duration
			});
		}
		
	}
};