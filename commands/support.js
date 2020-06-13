const Command = require("../command.js");
module.exports = rigidbot => {
	const menus = rigidbot.menus;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "support",
		desc: "Gives instructions on how to request support for the bot.",
		info: [
			"Displays the bot's owner, support guild, and instructions on how to continue if you are having problems with the usage of the bot itself."
		],
		usage: [
			"support"
		],
		alias: ["credit", "credits"],
		run: async e => {
			if (e.args.length != 0) return false;
			new menus.Pages({
				channel: e.channel,
				user: e.user
			}, {
				pages: [
					"Join the [support discord](https://discord.gg/MbX6VMA) to ask questions, request help, or give feedback on the bot.",
					"A list of possible commands you are able to use can be found by using the **help** command."
				],
				embed: {
					color: config.color("info"),
					title: "**Support**"
				}
			}).create();
			return true;
		}
	}));
};
