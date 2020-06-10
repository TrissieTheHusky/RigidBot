const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const users = rigidbot.configs.users;
	const config = rigidbot.configs.config;
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
			users.user(id);
			var balance = users.get(id, "balance");
			const user = utils.toUser(e.args[0]);
			if (user == null || user == undefined) {
				utils.sendErr(e.channel, "Cannot pay an unknown user.");
				return true;
			}
			if (id == user.id) {
				utils.sendErr(e.channel, "You may not pay yourself.");
				return true;
			}
			users.user(user.id);
			var other = users.get(user.id, "balance");
			const payment = +e.args[1];
			if (isNaN(payment) || payment <= 0 || payment == Infinity) {
				utils.sendErr(e.channel, "That is an invalid amount of coins.");
				return true;
			}
			if (payment > balance) {
				utils.sendErr(e.channel, "You have an insufficient amount of coins.");
				return true;
			}
			balance -= payment;
			other += payment;
			users.set(id, "balance", balance);
			users.set(user.id, "balance", other);
			utils.sendBox(e.channel, "Exchange: __" + user.username + "__", config.color("done"), "You have successfully payed **" + payment + "** coins to **" + user.username + "**!");
			return true;
		}
	}));
};