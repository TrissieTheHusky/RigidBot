const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const logs = rigidbot.configs.logs;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "ban",
		desc: "Bans a member from the guild with an optional reason.",
		usage: [
			"ban [member]",
			"ban [member] [reason...]"
		],
		perms: ["BAN_MEMBERS"],
		info: [
			"The ban command removes a user from your guild. They can't join back unless they are unbanned first.",
			"The optional reason given for banning the user will be sent to them upon being banned, as well as displayed in the audit log."
		],
		run: async e => {
			if (e.args.length == 0) return false;
			const user = utils.toMember(e.args[0], e.guild);
			const reason = e.args.length > 1 ? e.args.slice(1).join(" ") : "";
			if (user != null) {
				if (user.bannable) {
					if(!reason) 
						await user.send("You have been banned from **" + e.guild.name + "**.").catch(err => {});
					else
						await user.send("You have been banned from **" + e.guild.name + "** for _" + reason + "_.").catch(err => {});
					await user.ban(reason);
					logs.logHistory(e.guild.id, user.user.id, "ban", reason, -1);
					utils.sendBox(e.channel, "**Ban: __" + user.user.tag + "__**", config.color("warn"), reason);
				} else {
					utils.sendErr(e.channel, "That user could not be banned.");
				}
			} else
				utils.sendErr(e.channel, "That user could not be found.");
			return true;
		}
	}));
};
