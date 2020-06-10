const Command = require("../command.js");
const mice = require('@monadic_cat/mice-js');
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "dice",
		desc: "Performs the rolling of a given dice expression.",
		usage: [
			"dice [expr...]"
		],
		alias: ["roll", "diceroll", "rolldice"],
		run: async e => {
			if (!e.args.length) {
				return false;
			}
			try {
				let result = mice.roll_capped(e.args.join(" "), BigInt(10000));
				utils.sendBox(e.channel, "Dice Result", config.color("done"), result.display());
				return true;
			} catch (err) {
				utils.sendErr(e.channel, "" + err);
			}
			return true;
		}
	}));
};
