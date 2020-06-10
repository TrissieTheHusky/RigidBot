const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "coin",
		alias: ["coin", "flip", "cf"],
		desc: "Flips a coin and tells you the result.",
		usage: [
			"coinflip"
		],
		run: async e => {
			if (e.args.length != 0) {
				return false;
			}
			utils.sendBox(e.channel, "**Coin Flip**", config.color("done"), "The result is **" + (Math.random() >= 0.5 ? "heads" : "tails") + "**.");
			return true;
		}
	}));
};