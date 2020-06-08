const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "prefix",
		usage: [
			"prefix",
			"prefix [text]"
		],
		alias: ["symbol", "sym", "pre"],
		desc: "Manages the guild's bot prefix.",
		run: async e => {
			if (e.args.length == 0) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "This guild's prefix is " + rigidbot.configs.guilds.get(e.guild.id, "symbol")).create();
				return true;
			} else {
				if (!e.member.hasPermission("MANAGE_GUILD")) {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "You do not have permission to set the guild's prefix.").create();
					return true;
				}
				const text = e.args.join(" ");
				rigidbot.configs.guilds.set(e.guild.id, "symbol", text);
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "This guild's prefix is now " + text).create();
				return true;
			}
		}
	}));
};