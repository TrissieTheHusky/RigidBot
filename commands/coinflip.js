const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "coinflip",
		alias: ["coin", "flip", "cf"],
		desc: "Flips a coin and tells you the result.",
		usage: [
			"coinflip"
		],
		run: async e => {
			if (e.args.length != 0) {
				return false;
			}
			new utils.Message({
				channel: e.channel,
				user: e.user
			}, "The coin landed on **" + (Math.random() >= 0.5 ? "heads" : "tails") + "**.").create();
			return true;
		}
	}));
};