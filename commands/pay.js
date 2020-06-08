const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const helpers = rigidbot.helpers;
	const users = rigidbot.configs.users;
	rigidbot.commands.push(new Command({
		name: "pay",
		desc: "Pays an amount of coins to another user.",
		alias: ["transfer"],
		usage: [
			"pay [amount] [user]"
		],
		info: [
			"This command withdraws an amount of currency from your balance and deposits it into another user's balance.",
			"The action of paying another user coins can not be undone for any reason and should be considered a permanent action unless they pay you back."
		],
		run: async e => {
			if (e.args.length != 2) {
				return false;
			}
			const id = e.user.id;
			helpers.ensureUser(id);
			var balance = users.get(id, "balance");
			const user = helpers.toUser(e.args[0]);
			if (user == null || user == undefined) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "Cannot pay an unknown user.").create();
				return true;
			}
			var other = users.get(user.id, "balance");
			const payment = +e.args[1];
			if (isNaN(payment) || payment <= 0 || payment == Infinity) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "That is an invalid amount of coins.").create();
				return true;
			}
			if (payment > balance) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "You do not have enough coins to do this.").create();
				return true;
			}
			balance -= payment;
			other += payment;
			users.set(id, "balance", balance);
			users.set(user.id, "balance", other);
			new utils.Embedded({
				channel: e.channel,
				user: e.user
			}, {
				title: "**Exchange: __" + user.username + "__**",
				color: 0x880000,
				desc: "You have successfully payed **" + payment + "** coins to **" + user.username + "**!"
			}).create();
			return true;
		}
	}));
};