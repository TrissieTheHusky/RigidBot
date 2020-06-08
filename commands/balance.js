const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const helpers = rigidbot.helpers;
	const users = rigidbot.configs.users;
	rigidbot.commands.push(new Command({
		name: "balance",
		desc: "Shows the amount of coins that you or someone else currently has.",
		alias: ["bal", "money", "coins"],
		usage: [
			"balance",
			"balance [user]"
		],
		info: [
			"Use this command to check your balance, or the balance of another user. The money displayed in this way is only applicable when using this bot, and will not transfer to any other type of currency.",
			"You can use the bot's coins to pay other users. Coins will be given to you for a variety of reasons, including but not limited to activity, large guild ownership, and usage of the bot."
		],
		run: async e => {
			if (e.args.length > 1) {
				return false;
			}
			if (e.args.length == 0) {
				const id = e.user.id;
				helpers.ensureUser(id);
				const balance = users.get(id, "balance");
				new utils.Embedded({
					channel: e.channel,
					user: e.user
				}, {
					title: "**Balance: __" + e.user.username + "__**",
					color: 0x00FFFF,
					desc: "Your balance is **" + balance + "**."
				}).create();
			} else {
				const user = helpers.toUser(e.args[0]);
				if (user == null || user == undefined) {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "Cannot get the balance of an unknown user.").create();
					return true;
				}
				const id = user.id;
				helpers.ensureUser(id);
				const balance = users.get(id, "balance");
				new utils.Embedded({
					channel: e.channel,
					user: e.user
				}, {
					title: "**Balance: __" + user.username + "__**",
					color: 0x009999,
					desc: "That user's balance is **" + balance + "**."
				}).create();
			}
			return true;
		}
	}));
};