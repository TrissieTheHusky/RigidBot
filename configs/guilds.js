const Config = require("../config.js");

module.exports = rigidbot => {
	return class Guilds extends Config {
		
		constructor() {
			super("./configs/data/guilds.json");
		}
		
		guild(id) {
			const main = rigidbot.configs.config;
			this.create(id, "symbol", main.get("symbol"));
			this.create(id, "messages", "join", null);
			this.create(id, "messages", "leave", null);
			this.create(id, "message-channel", null);
			this.create(id, "polls", {});
			this.create(id, "poll-channel", null);
			this.create(id, "game-channel", null);
			this.create(id, "autoroles", "user", []);
			this.create(id, "autoroles", "bot", []);
			this.create(id, "freeroles", []);
			this.create(id, "reactionroles", {});
			this.create(id, "channel-whitelist", []);
			this.create(id, "channel-blacklist", []);
			this.create(id, "channel-mode", false);
			this.create(id, "command-whitelist", []);
			this.create(id, "command-blacklist", []);
			this.create(id, "command-mode", false);
			this.create(id, "feature-whitelist", []);
			this.create(id, "feature-blacklist", []);
			this.create(id, "feature-mode", false);
		}
		
		reactRoles(guild, channel, message) {
			this.create(guild, "reactionroles", channel, message, []);
		}
		
	}
};