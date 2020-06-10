const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const menus = rigidbot.menus;
	const config = rigidbot.configs.config;
	const logs = rigidbot.configs.logs;
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
			const user = e.args.length == 1 ? utils.toUser(e.args[0]) : e.user;
			if (user == null) {
				utils.sendErr(e.channel, "That is an unknown user.");
				return true;
			}
			logs.user(e.guild.id, user.id);
			const history = logs.get("history", e.guild.id, user.id);
			const items = [];
			history.forEach(entry => {
				const dur = entry.duration < 0 ? "" : (" __" + entry.duration + "__");
				items.push("**[" + entry.type.toLowerCase() + dur + "]** *" + entry.reason + "*");
			});
			new menus.Items({
				channel: e.channel,
				user: e.user
			}, {
				items,
				embed: {
					title: "**History: __" + user.username + "__**",
					color: config.color("warn")
				}
			}).create();
			return true;
		}
	}));
};