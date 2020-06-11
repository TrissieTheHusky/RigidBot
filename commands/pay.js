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
			"pay [user] [amount]"
		],
		info: [
			"This command withdraws an amount of currency from your balance and deposits it into another user's balance.",
			"The action of paying another user coins can not be undone for any reason and should be considered a permanent action unless they pay you back."
		],
		run: async e => {
			if (e.args.length < 2) {
				return false;
			}
			if (e.args.length == 2) {
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
			} else {
				const id = e.user.id;
				users.user(id);
				const user = utils.toUser(e.args[0]);
				if (user == null || user == undefined) {
					utils.sendErr(e.channel, "Cannot pay an unknown user.");
					return true;
				}
				if (id == user.id) {
					utils.sendErr(e.channel, "You may not pay yourself.");
					return true;
				}
				const quantity = +e.args[1];
				if (isNaN(quantity) || quantity == Infinity || quantity <= 0 || Math.floor(quantity) != quantity) {
					utils.sendErr(e.channel, "That is an invalid quantity of items.");
					return true;
				}
				users.user(user.id);
				const name = e.args.slice(2).join(" ").toLowerCase();
				var res = null;
				var data = null;
				users.get(id, "backpack", "items").forEach(slot => {
					const item = rigidbot.items[slot.id];
					if (item.name.toLowerCase() == name || slot.id == +name) {
						data = slot;
						res = item;
					}
				});
				if (res == null) {
					utils.sendErr(e.channel, "You do not have any items with that name.");
					return true;
				}
				if (data.quantity < quantity) {
					utils.sendErr(e.channel, "You do not have enough of that item.");
					return true;
				}
				const space = quantity * res.space;
				if (users.spaceLeft(user.id) < space) {
					utils.sendErr(e.channel, "That user does not have enough space.");
					return true;
				}
				users.removeItem(id, data, quantity);
				users.addItem(user.id, data, quantity);
				utils.sendBox(e.channel, "Exchange: __" + user.username + "__", config.color("done"), "You have successfully payed **" + quantity + "x** " + res.emoji + " to **" + user.username + "**!");
			}
			return true;
		}
	}));
};