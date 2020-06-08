const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const helpers = rigidbot.helpers;
	rigidbot.commands.push(new Command({
		name: "kick",
		desc: "Kicks a member from the guild with an optional reason.",
		usage: [
			"kick [member]",
			"kick [member] [reason...]"
		],
		perms: ["KICK_MEMBERS"],
		info: [
			"The kick command removes a user from your guild. They can still join back, but must do so with a new or permanent invite link.",
			"The optional reason given for kicking the user will be sent to them upon being kicked, as well as displayed in the audit log."
		],
		run: async e => {
			if (e.args.length == 0) {
				return false;
			}
			const user = helpers.toMember(e.args[0], e.guild);
			const reason = e.args.length > 1 ? e.args.slice(1).join(" ") : "an unknown reason";
			if (user != null) {
				if (user.kickable) {
					await user.send("You have been kicked from **" + e.guild.name + "** for _" + reason + "_.").catch(err => {});
					await user.kick(reason);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "The user **" + user.user.tag + "** has been kicked for _" + reason + "_.").create();
				} else {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "That user could not be kicked.").create();
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