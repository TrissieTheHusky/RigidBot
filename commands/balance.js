const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const users = rigidbot.configs.users;
	const config = rigidbot.configs.config;
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
			if (e.args.length > 1)
				return false;
			const ch = e.channel;
			if (e.args.length == 0) {
				const id = e.user.id;
				users.user(id);
				const balance = users.get(id, "balance");
				utils.sendBox(ch, "**Balance: __" + e.user.username + "__**", config.color("stat"), "Your balance is **" + balance + "**.");
			} else {
				const user = utils.toUser(e.args[0]);
				if (user == null || user == undefined) {
					utils.sendErr(ch, "Cannot get the balance of an unknown user.");
					return true;
				}
				const id = user.id;
				users.user(id);
				const balance = users.get(id, "balance");
				utils.sendBox(ch, "**Balance: __" + user.username + "__**",  config.color("stat"), "That user's balance is **" + balance + "**.");
			}
			return true;
		}
	}));
};
