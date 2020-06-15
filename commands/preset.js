const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	const guilds = rigidbot.configs.guilds;
	rigidbot.commands.push(new Command({
		name: "preset",
		desc: "Overrides the guild's whitelist, blacklists, and modes with a preset.",
		usage: [
			"preset [name]"
		],
		immune: true,
		perms: ["MANAGE_GUILD"],
		run: async e => {
			if (e.args.length > 1) {
				return false;
			} else if (e.args.length == 0) {
				utils.sendBox(e.channel, "Config Preset", config.color("info"), [
					"**default** returns the bot to the default settings.",
					"**moderation** restricts the bot to only moderation commands."
				].join("\n"));
				return true;
			}
			if (e.args[0] == "default") {
				guilds.set(e.guild.id, "command-whitelist", []);
				guilds.set(e.guild.id, "command-blacklist", []);
				guilds.set(e.guild.id, "command-mode", false);
				guilds.set(e.guild.id, "feature-whitelist", []);
				guilds.set(e.guild.id, "feature-blacklist", []);
				guilds.set(e.guild.id, "feature-mode", false);
			} else if (e.args[0] == "moderation") {
				guilds.set(e.guild.id, "command-whitelist", [
					"kick", "ban", "warn", "unban", "purge", "info", "history"
				]);
				guilds.set(e.guild.id, "command-blacklist", []);
				guilds.set(e.guild.id, "command-mode", true);
				guilds.set(e.guild.id, "feature-whitelist", []);
				guilds.set(e.guild.id, "feature-blacklist", [
					"xp"
				]);
				guilds.set(e.guild.id, "feature-mode", false);
			} else {
				utils.sendErr(e.channel, "Unknown preset. Run the preset command without arguments to see a list.");
				return true;
			}
			utils.sendBox(e.channel, "Config Preset", config.color("done"), "Lists and modes have been overwritten by the new preset.");
			return true;
		}
	}));
};
