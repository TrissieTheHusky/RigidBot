const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "eval", root: true,
		run: async e => {
			try {
				utils.sendBox(e.channel, "**Code Eval**", config.color("done"), "" + eval(e.args.join(" ")));
			} catch(err) {
				utils.sendErr(e.channel, "" + err);
			}
			return true;
		}
	}));
};