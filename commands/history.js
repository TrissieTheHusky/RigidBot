const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const helpers = rigidbot.helpers;
	const log = rigidbot.configs.logs;
	rigidbot.commands.push(new Command({
		name: "history",
		desc: "Displays the history of infractions of a user.",
		alias: [
			"infractions",
			"infraction",
			"inf",
			"hist"
		],
		usage: [
			"history",
			"history [user]"
		],
		run: e => {
			if (e.args.length > 1) {
				return false;
			}
			const user = e.args.length == 1 ? helpers.toUser(e.args[0]) : e.user;
			if (user == null) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "That is an unknown user.").create();
				return true;
			}
			helpers.ensureHistory(e.guild, user);
			const history = log.get("history", e.guild.id, user.id);
			const items = [];
			history.forEach(entry => {
				const dur = entry.duration < 0 ? "" : (" __" + entry.duration + "__");
				items.push("**[" + entry.type.toLowerCase() + dur + "]** *" + entry.reason + "*");
			});
			new utils.Items({
				channel: e.channel,
				user: e.user
			}, {
				items,
				embed: {
					title: "**History: __" + user.username + "__**",
					color: 0xFF9900
				}
			}).create();
			return true;
		}
	}));
};