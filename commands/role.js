const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const guilds = rigidbot.configs.guilds;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "role",
		desc: "Toggles whether or not you have one of the guild's free roles.",
		alias: [
			"roles",
			"freerole",
			"freeroles",
			"getrole",
			"getroles",
			"togglerole",
			"toggleroles"
		],
		usage: [
			"role",
			"role [name]"
		],
		run: e => {
			if (e.args.length == 0) {
				const roles = guilds.get(e.guild.id, "freeroles");
				if (!roles.length) {
					utils.sendErr(e.channel, "This guild has no free roles.");
					return true;
				}
				const arr = [];
				roles.forEach(role => {
					arr.push("<@&" + role + ">");
				});
				const text = arr.join(" ");
				utils.sendBox(e.channel, "Free Roles", config.color("stat"), text);
				return true;
			} else if (e.args.length == 1) {
				const role = utils.toRole(e.args[0], e.guild);
				if (role == null) {
					utils.sendErr(e.channel, "That is an unknown role.");
					return true;
				}
				const roles = guilds.get(e.guild.id, "freeroles");
				var free = false;
				roles.forEach(id => {
					if (id == role.id) {
						free = true;
					}
				});
				if (!free) {
					utils.sendErr(e.channel, "That is not a free role.");
					return true;
				}
				const member = e.member;
				const exists = member.roles.cache.has(role.id);
				if (exists) {
					member.roles.remove(role);
					utils.sendBox(e.channel, "Free Roles", config.color("done"), "Removed the free role from yoursef.");
				} else {
					member.roles.add(role);
					utils.sendBox(e.channel, "Free Roles", config.color("done"), "Added the free role to yoursef.");
				}
				return true;
			}
			return false;
		}
	}));
};