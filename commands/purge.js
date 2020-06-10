const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "purge",
		perms: ["MANAGE_MESSAGES"],
		desc: "Purges messages in bulk.",
		alias: ["clear", "clean"],
		usage: [
			"purge [number]"
		],
		info: [
			"This is used to delete messages in bulk. You should only use this command in rare cases where the chat is being spammed, and to delete at least 2 messages.",
			"The messages get deleted in multiples of 100, but there will be a delay between every hundred due to Discord's rate limiting.",
			"Please note that this command is not reversable in any way, and you should use it with caution."
		],
		run: async e => {
			if (e.args.length == 1) {
				var amount = +e.args[0];
				if (amount == amount) {
					if (amount >= 2) {
						if (amount <= 100) {
							try {
								await e.channel.bulkDelete(amount);
							} catch(err) {
								utils.sendErr(e.channel, "Can only delete messages less than 2 weeks old and the bot requires the permission to do so.");
							}
						} else {
							utils.sendErr(e.channel, "You cannot clear more than 100 messages.");
						}
					} else {
						utils.sendErr(e.channel, "You cannot clear less than 2 messages.");
					}
				} else {
					utils.sendErr(e.channel, "The amount provided was in an invalid format.");
				}
			} else {
				return false;
			}
			return true;
		}
	}));
};