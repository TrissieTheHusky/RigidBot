const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const logs = rigidbot.configs.logs;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "warn",
		desc: "Warns a member from the guild with an optional reason.",
		usage: [
			"warn [member] [reason...]"
		],
		perms: ["KICK_MEMBERS"],
		info: [
			"The warn command gives a user a textual warning with no side effects except an official note on their history. This command should be used if things are getting out of hand but haven't raised to a worse issue yet.",
			"Warning a user requires a reason and cannot be undone. It should be used sparingly, not all the time."
		],
		run: async e => {
			if (e.args.length < 2) {
				return false;
			}
			const user = utils.toMember(e.args[0], e.guild);
			const reason = e.args.slice(1).join(" ");
			if (user != null) {
				logs.logHistory(e.guild.id, user.user.id, "warn", reason, -1);
				utils.sendBox(e.channel, "Warn", config.color("warn"), "The user **" + user.user.tag + "** has been warned for _" + reason + "_.");
			} else {
				utils.sendErr(e.channel, "That user could not be found.");
			}
			return true;
		}
	}));
};