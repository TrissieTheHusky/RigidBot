const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "ban",
		desc: "Bans a member from the guild with an optional reason.",
		usage: [
			"ban [member] [reason...]"
		],
		perms: ["BAN_MEMBERS"],
		info: [
			"The ban command removes a user from your guild. They can't join back unless they are unbanned first.",
			"The optional reason given for banning the user will be sent to them upon being banned, as well as displayed in the audit log."
		],
		run: async e => {
			if (e.args.length == 0) {
				return false;
			}
			const user = utils.toMember(e.args[0], e.guild);
			const reason = e.args.length > 1 ? e.args.slice(1).join(" ") : "an unknown reason";
			if (user != null) {
				if (user.bannable) {
					await user.send("You have been banned from **" + e.guild.name + "** for _" + reason + "_.").catch(err => {});
					await user.ban(reason);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "The user **" + user.user.tag + "** has been banned for _" + reason + "_.").create();
				} else {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "That user could not be banned.").create();
				}
			} else {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "That user could not be found.").create();
			}
			return true;
		}
	}));
};