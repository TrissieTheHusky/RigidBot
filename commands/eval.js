const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "eval", root: true,
		run: async e => {
			try {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "" + eval(e.args.join(" "))).create();
			} catch(err) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "" + err).create();
			}
			return true;
		}
	}));
};