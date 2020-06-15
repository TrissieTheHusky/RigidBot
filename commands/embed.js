const Command = require("../command.js");
const Discord = require("discord.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "embed",
		desc: "Sends a message with an embed.",
		usage: [
			"embed [json...]"
		],
		alias: ["sendembed"],
		perms: ["MANAGE_SERVER"],
		run: async e => {
			if (!e.args.length) {
				return false;
			}
			try {
				const embed = JSON.parse(e.args.join(" "));
				e.channel.send({
					embed
				});
				e.msg.delete().catch(err => {});
			} catch (err) {
				utils.sendErr(e.channel, "Invalid embed. Try looking at the info pages of this command, using the help command, to learn how to properly create an embed.");
			}
			return true;
		}
	}));
};
