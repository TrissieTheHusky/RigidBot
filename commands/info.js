const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "info",
		alias: ["information", "userinfo", "userinformation"],
		desc: "Displays general information about yourself or another user.",
		usage: [
			"info",
			"info [user]"
		],
		run: async e => {
			if (e.args.length > 1) {
				return false;
			}
			const member = e.args.length == 0 ? e.member : utils.toMember(e.args[0], e.guild);
			if (member == null) {
				utils.sendErr(e.channel, "Could not find that user in this guild.");
				return true;
			}
			const originalStatus = member.presence.status;
			var status;
			if (originalStatus == "online")
				status = "Online";
			else if (originalStatus == "offline")
				status = "Offline";
			else if (originalStatus == "dnd")
				status = "Do Not Disturb";
			else if (originalStatus == "idle")
				status = "Idle";
			var rolelist = [];
			member.roles.cache.array().forEach(role => {
				if (role.id == e.guild.roles.everyone.id) {
					return;
				}
				rolelist.push("<@&" + role.id + ">");
			});
			rolelist = rolelist.join(" ");
			utils.sendEmbed(e.channel, {
				description: [
					"**Display name**: " + member.displayName,
					"**User Name**: " + member.user.username,
					"**Account Date**: " + member.user.createdAt,
					"**Join Date**: " + member.joinedAt,
					"**Name Color**: " + member.displayHexColor.toUpperCase(),
					"**Identifier**: " + member.user.id,
					"**Status**: " + status,
					"**Is Kickable**: " + member.kickable,
					"**Is Bannable**: " + member.bannable,
					"**Is Nickable**: " + member.manageable,
					"**Highest Role**: <@&" + member.roles.highest.id + ">",
					"**Roles**: " + rolelist
				].join("\n"),
				title: "**Info: __" + member.user.username + "__**",
				color: config.color("info")
			});
			return true;
		}
	}));
};
