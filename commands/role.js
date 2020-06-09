const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const guilds = rigidbot.configs.guilds;
	const helpers = rigidbot.helpers;
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
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild has no free roles.").create();
					return true;
				}
				const arr = [];
				roles.forEach(role => {
					arr.push("<@&" + role + ">");
				});
				const text = arr.join(" ");
				new utils.Embedded({
					channel: e.channel,
					user: e.user
				}, {
					title: "**Free Roles**",
					color: 0x00FFFF,
					desc: text
				}).create();
				return true;
			} else if (e.args.length == 1) {
				const role = helpers.toRole(e.args[0], e.guild);
				if (role == null) {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "That is an unknown role.").create();
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
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "That is not a free role.").create();
					return true;
				}
				const member = e.member;
				const exists = member.roles.cache.has(role.id);
				if (exists) {
					member.roles.remove(role);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "Removed the free role from yoursef.").create();
				} else {
					member.roles.add(role);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "Added the free role to yourself.").create();
				}
				return true;
			}
			return false;
		}
	}));
};