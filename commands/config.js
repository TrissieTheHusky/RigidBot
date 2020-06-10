const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const guilds = rigidbot.configs.guilds;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "config",
		usage: [
			"config prefix",
			"config prefix [text]",
			"config join",
			"config join [message]",
			"config leave",
			"config leave [message]",
			"config channel",
			"config channel [location]",
			"config polls",
			"config polls [channel]",
			"config auto user",
			"config auto user [role]",
			"config auto bot",
			"config auto bot [role]",
			"config role [name]",
			"config role [name] [channel] [message] [emoji]",
			"config inspect",
			"config inspect [channel]",
			"config inspect [channel] [message]"
		],
		alias: ["cfg", "setup", "settings"],
		desc: "Manages settings for guilds, channels, users, and more.",
		info: [
			"The config command is what you use to set anything up for your guild. It manages the bot's channel lists, messages, roles, and more."
		],
		run: async e => {
			const args = e.args;
			if (args.length > 0) {
				if (args.length == 1 && args[0] == "prefix") {
					utils.sendBox(e.channel, "Guild Prefix", config.color("stat"), "This guild's prefix is " + guilds.get(e.guild.id, "symbol"));
					return true;
				} else if (args.length == 2 && args[0] == "prefix") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's prefix.");
						return true;
					}
					const text = args[1]
					guilds.set(e.guild.id, "symbol", text);
					utils.sendBox(e.channel, "Guild Prefix", config.color("done"), "This guild's prefix is now " + text);
					return true;
				} else if (args.length == 1 && args[0] == "join") {
					const msg = guilds.get(e.guild.id, "messages", "join");
					if (msg == null) {
						utils.sendErr(e.channel, "This guild's join message has not been set.");
					} else {
						utils.sendBox(e.channel, "Join Message", config.color("stat"), msg);
					}
					return true;
				} else if (args.length == 1 && args[0] == "leave") {
					const msg = guilds.get(e.guild.id, "messages", "leave");
					if (msg == null) {
						utils.sendErr(e.channel, "This guild's leave message has not been set.");
					} else {
						utils.sendBox(e.channel, "Leave Message", config.color("stat"), msg);
					}
					return true;
				} else if (args.length > 1 && args[0] == "join") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's join message.");
						return true;
					}
					const text = args.slice(1).join(" ");
					guilds.set(e.guild.id, "messages", "join", text);
					utils.sendBox(e.channel, "Join Message", config.color("done"), text);
					return true;
				} else if (args.length > 1 && args[0] == "leave") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's leave message.");
						return true;
					}
					const text = args.slice(1).join(" ");
					guilds.set(e.guild.id, "messages", "leave", text);
					utils.sendBox(e.channel, "Leave Message", config.color("done"), text);
					return true;
				} else if (args.length == 1 && args[0] == "channel") {
					const channel = guilds.get(e.guild.id, "message-channel");
					if (channel == null) {
						utils.sendErr(e.channel, "This guild's message channel has not been set.");
					} else {
						utils.sendBox(e.channel, "Message Channel", config.color("stat"), "This guild's message channel is <#" + channel + ">");
					}
					return true;
				} else if (args.length == 2 && args[0] == "channel") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's message channel.");
						return true;
					}
					const text = args[1];
					const channel = utils.toChannel(text);
					guilds.set(e.guild.id, "message-channel", channel.id);
					utils.sendBox(e.channel, "Message Channel", config.color("done"), "This guild's message channel has been set to <#" + channel.id + ">");
					return true;
				} else if (args.length == 1 && args[0] == "polls") {
					const channel = guilds.get(e.guild.id, "poll-channel");
					if (channel == null) {
						utils.sendErr(e.channel, "This guild's poll channel has not been set.");
					} else {
						utils.sendBox(e.channel, "Poll Channel", config.color("stat"), "This guild's poll channel is <#" + channel + ">");
					}
					return true;
				} else if (args.length == 2 && args[0] == "polls") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's poll channel.");
						return true;
					}
					const text = args[1];
					const channel = utils.toChannel(text);
					guilds.set(e.guild.id, "poll-channel", channel.id);
					utils.sendBox(e.channel, "Poll Channel", config.color("done"), "This guild's poll channel has been set to <#" + channel.id + ">");
					return true;
				} else if (args.length == 2 && args[0] == "auto" && args[1] == "user") {
					const roles = guilds.get(e.guild.id, "autoroles", "user");
					if (!roles.length) {
						utils.sendErr(e.channel, "This guild has no automatic user roles.");
						return true;
					}
					const arr = [];
					roles.forEach(role => {
						arr.push("<@&" + role + ">");
					});
					const text = arr.join(" ");
					utils.sendBox(e.channel, "User Roles", config.color("stat"), text);
					return true;
				} else if (args.length == 2 && args[0] == "auto" && args[1] == "bot") {
					const roles = guilds.get(e.guild.id, "autoroles", "bot");
					if (!roles.length) {
						utils.sendErr(e.channel, "This guild has no automatic bot roles.");
						return true;
					}
					const arr = [];
					roles.forEach(role => {
						arr.push("<@&" + role + ">");
					});
					const text = arr.join(" ");
					utils.sendBox(e.channel, "Bot Roles", config.color("stat"), text);
					return true;
				} else if (args.length == 3 && args[0] == "auto" && args[1] == "user") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's automatic user roles.");
						return true;
					}
					const role = utils.toRole(args[2], e.guild);
					if (role == null) {
						utils.sendErr(e.channel, "That role does not exist.");
						return true;
					}
					const roles = guilds.get(e.guild.id, "autoroles", "user");
					const id = role.id;
					if (roles.indexOf(id) != -1) {
						roles.splice(roles.indexOf(id), 1);
						utils.sendBox(e.channel, "User Roles", config.color("done"), "That role is no longer an automatic user role.");
					} else {
						roles.push(id);
						utils.sendBox(e.channel, "User Roles", config.color("done"), "That role is now an automatic user role.");
					}
					return true;
				} else if (args.length == 3 && args[0] == "auto" && args[1] == "bot") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's automatic bot roles.");
						return true;
					}
					const role = utils.toRole(args[2], e.guild);
					if (role == null) {
						utils.sendErr(e.channel, "That role does not exist.");
						return true;
					}
					const roles = guilds.get(e.guild.id, "autoroles", "bot");
					const id = role.id;
					if (roles.indexOf(id) != -1) {
						roles.splice(roles.indexOf(id), 1);
						utils.sendBox(e.channel, "Bot Roles", config.color("done"), "That role is no longer an automatic bot role.");
					} else {
						roles.push(id);
						utils.sendBox(e.channel, "User Roles", config.color("done"), "That role is now an automatic bot role.");
					}
					return true;
				} else if (args.length == 1 && args[0] == "role") {
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
				} else if (args.length == 1 && args[0] == "inspect") {
					const data = guilds.data[e.guild.id].reactionroles;
					if (!Object.keys(data).length) {
						utils.sendErr(e.channel, "This guild has no role channels.");
						return true;
					}
					const items = [];
					Object.keys(data).forEach(item => {
						items.push("<#" + item + ">");
					});
					const text = items.join(" ");
					utils.sendBox(e.channel, "Role Channels", config.color("stat"), text);
					return true;
				} else if (args.length == 2 && args[0] == "inspect") {
					const channel = utils.toChannel(args[1]);
					if (channel == null) {
						utils.sendErr(e.channel, "That channel does not exist.");
						return true;
					}
					var data = guilds.data[e.guild.id].reactionroles;
					if (!(channel.id in data)) {
						utils.sendErr(e.channel, "That channel is not a role channel.");
						return true;
					}
					data = data[channel.id];
					if (!Object.keys(data).length) {
						utils.sendErr(e.channel, "This channel has no role messages.");
						return true;
					}
					const items = [];
					for (const [key, val] of Object.entries(data)) {
						var ref = "http://discordapp.com/channels/" + e.guild.id + "/" + channel.id + "/" + key;
						items.push("**[message](" + ref + ")** roles: " + val.length);
					}
					const text = items.join("\n");
					utils.sendBox(e.channel, "Role Messages", config.color("stat"), text);
					return true;
				} else if (args.length == 3 && args[0] == "inspect") {
					const channel = utils.toChannel(args[1]);
					if (channel == null) {
						utils.sendErr(e.channel, "That channel does not exist.");
						return true;
					}
					var data = guilds.data[e.guild.id].reactionroles;
					if (!(channel.id in data)) {
						utils.sendErr(e.channel, "That channel is not a role channel.");
						return true;
					}
					data = data[channel.id];
					const mid = args[2];
					if (!(mid in data)) {
						utils.sendErr("That message is not a role message.");
						return true;
					}
					data = data[mid];
					if (!data.length) {
						utils.sendErr(e.channel, "This message has no reaction roles.");
						return true;
					}
					const items = [];
					data.forEach(item => {
						items.push(item.emoji + " <@&" + item.role + ">");
					});
					const text = items.join("\n");
					utils.sendBox(e.channel, "Reaction Roles", config.color("stat"), text);
					return true;
				} else if (args.length == 5 && args[0] == "role") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's free roles.");
						return true;
					}
					const role = utils.toRole(args[1], e.guild);
					if (role == null) {
						utils.sendErr("That role does not exist.");
						return true;
					}
					const chantext = args[2];
					const msgid = args[3];
					const emoji = args[4];
					const channel = utils.toChannel(chantext);
					const chanid = channel.id;
					if (channel == null) {
						utils.sendErr(e.channel, "That channel does not exist.");
						return true;
					}
					const msg = await channel.messages.fetch(msgid);
					if (msg == null) {
						utils.sendErr(e.channel, "That message does not exist.");
						return true;
					}
					guilds.reactRoles(e.guild.id, chanid, msgid);
					const pairs = guilds.get(e.guild.id, "reactionroles", chanid, msgid);
					const index = pairs.findIndex(item => item.emoji == emoji && item.role == role.id);
					if (index == -1) {
						pairs.push({
							emoji, role: role.id
						});
						utils.sendBox(e.channel, "Reaction Roles", config.color("done"), "That role is now a reaction role.");
					} else {
						pairs.splice(index, 1);
						if (!pairs.length) {
							guilds.delete(e.guild.id, "reactionroles", chanid, msgid);
						}
						if (!Object.keys(guilds.get(e.guild.id, "reactionroles", chanid)).length) {
							guilds.delete(e.guild.id, "reactionroles", chanid);
						}
						utils.sendBox(e.channel, "Reaction Roles", config.color("done"), "That role is no longer a reaction role.");
					}
					return true;
				} else if (args.length == 2 && args[0] == "role") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's free roles.");
						return true;
					}
					const role = utils.toRole(args[1], e.guild);
					if (role == null) {
						utils.sendErr(e.channel, "That role does not exist.");
						return true;
					}
					const roles = guilds.get(e.guild.id, "freeroles");
					const id = role.id;
					if (roles.indexOf(id) != -1) {
						roles.splice(roles.indexOf(id), 1);
						utils.sendBox(e.channel, "Free Roles", config.color("done"), "That role is no longer a free role.");
					} else {
						roles.push(id);
						utils.sendBox(e.channel, "Free Roles", config.color("done"), "That role is now a free role.");
					}
					return true;
				}
			}
			return false;
		}
	}));
};