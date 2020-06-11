const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const logs = rigidbot.configs.logs;
	const config = rigidbot.configs.config;
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
			if (!e.args.length) return false;
			const user = utils.toMember(e.args[0], e.guild);
			const reason = e.args.length > 1 ? e.args.slice(1).join(" ") : "";
			if (user != null) {
				if (user.kickable) {
					if(!reason) 
						await user.send("You have been kicked from **" + e.guild.name + "**.").catch(err => {});
					else
						await user.send("You have been kicked from **" + e.guild.name + "** for _" + reason + "_.").catch(err => {});
					await user.kick(reason);
					logs.logHistory(e.guild.id, user.user.id, "kick", reason, -1);
					utils.sendBox(e.channel, "**Kick: __" + user.user.tag + "__**", config.color("warn"), reason);
				} else {
					utils.sendErr(e.channel, "That user could not be kicked.");
				}
			} else {
				utils.sendErr(e.channel, "That user could not be found.");
			}
			return true;
		}
	}));
};
