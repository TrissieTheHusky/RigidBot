const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "unban",
		desc: "Unbans a member from the guild.",
		usage: [
			"unban [member]"
		],
		perms: ["BAN_MEMBERS"],
		info: [
			"The unban command allows a previously banned user to join back to your guild once thry are given a new invite."
		],
		run: async e => {
			if (e.args.length != 1) {
				return false;
			}
			const user = utils.toUser(e.args[0]);
			if (user != null) {
				try {
					await e.guild.members.unban(user);
				} catch(err) {
					utils.sendErr(e.channel, "Could not unban that user.");
					return true;
				}
				utils.sendBox(e.channel, "Unban", config.color("warn"), "The user **" + user.tag + "** has been unbanned.");
			} else {
				utils.sendErr(e.channel, "That user could not be found.");
			}
			return true;
		}
	}));
};