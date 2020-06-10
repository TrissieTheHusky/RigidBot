const Command = require("../command.js");
const mice = require('@monadic_cat/mice-js');
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "dice",
		desc: "Performs the rolling of a given dice expression.",
		usage: [
			"dice d[n] + [n] - d[n]",
			"dice d6 + 3",
			"dice d20"
		],
		alias: ["roll", "diceroll", "rolldice"],
		run: async e => {
			try {
				let result = mice.roll_capped(e.args.join(" "), BigInt(10000));
				new utils.Message({
					channel: e.channel,
					user: e.user,
				}, result.display()).create();
				return true;
			} catch (e) {
				new utils.Message({
					channel: e.channel,
					user: e.user,
				}, e).create();
				return false;
			}
		}
	}));
};
