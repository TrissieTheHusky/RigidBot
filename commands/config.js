const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const bot = rigidbot.bot;
	const guilds = rigidbot.configs.guilds;
	const helpers = rigidbot.helpers;
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
		run: async e => {
			const args = e.args;
			if (args.length > 0) {
				if (args.length == 1 && args[0] == "prefix") {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's prefix is " + guilds.get(e.guild.id, "symbol")).create();
					return true;
				} else if (args.length == 2 && args[1] == "prefix") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's prefix.").create();
						return true;
					}
					const text = args[1]
					guilds.set(e.guild.id, "symbol", text);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's prefix is now " + text).create();
					return true;
				} else if (args.length == 1 && args[0] == "join") {
					const msg = guilds.get(e.guild.id, "messages", "join");
					if (msg == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's join message has not been set.").create();
					} else {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, msg).create();
					}
					return true;
				} else if (args.length == 1 && args[0] == "leave") {
					const msg = guilds.get(e.guild.id, "messages", "leave");
					if (msg == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's leave message has not been set.").create();
					} else {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, msg).create();
					}
					return true;
				} else if (args.length > 1 && args[0] == "join") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's join message.").create();
						return true;
					}
					const text = args.slice(1).join(" ");
					guilds.set(e.guild.id, "messages", "join", text);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's join message has been set.").create();
					return true;
				} else if (args.length > 1 && args[0] == "leave") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's leave message.").create();
						return true;
					}
					const text = args.slice(1).join(" ");
					guilds.set(e.guild.id, "messages", "leave", text);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's leave message has been set.").create();
					return true;
				} else if (args.length == 1 && args[0] == "channel") {
					const channel = guilds.get(e.guild.id, "message-channel");
					if (channel == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's message channel has not been set.").create();
					} else {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's message channel is <#" + channel + ">").create();
					}
					return true;
				} else if (args.length == 2 && args[0] == "channel") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's message channel.").create();
						return true;
					}
					const text = args[1];
					const channel = helpers.toChannel(text);
					guilds.set(e.guild.id, "message-channel", channel.id);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's message channel has been set to <#" + channel.id + ">").create();
					return true;
				} else if (args.length == 1 && args[0] == "polls") {
					const channel = guilds.get(e.guild.id, "poll-channel");
					if (channel == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's poll channel has not been set.").create();
					} else {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's poll channel is <#" + channel + ">").create();
					}
					return true;
				} else if (args.length == 2 && args[0] == "polls") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's poll channel.").create();
						return true;
					}
					const text = args[1];
					const channel = helpers.toChannel(text);
					guilds.set(e.guild.id, "poll-channel", channel.id);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's poll channel has been set to <#" + channel.id + ">").create();
					return true;
				} else if (args.length == 2 && args[0] == "auto" && args[1] == "user") {
					const roles = guilds.get(e.guild.id, "autoroles", "user");
					if (!roles.length) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild has no automatic user roles.").create();
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
						title: "**User Roles**",
						color: 0x00AA00,
						desc: text
					}).create();
					return true;
				} else if (args.length == 2 && args[0] == "auto" && args[1] == "bot") {
					const roles = guilds.get(e.guild.id, "autoroles", "bot");
					if (!roles.length) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild has no automatic bot roles.").create();
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
						title: "**Bot Roles**",
						color: 0x00AA00,
						desc: text
					}).create();
					return true;
				} else if (args.length == 3 && args[0] == "auto" && args[1] == "user") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's automatic user roles.").create();
						return true;
					}
					const role = helpers.toRole(args[2], e.guild);
					if (role == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role does not exist.").create();
						return true;
					}
					const roles = guilds.get(e.guild.id, "autoroles", "user");
					const id = role.id;
					if (roles.indexOf(id) != -1) {
						roles.splice(roles.indexOf(id), 1);
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is no longer an automatic user role.").create();
					} else {
						roles.push(id);
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is now an automatic user role.").create();
					}
					return true;
				} else if (args.length == 3 && args[0] == "auto" && args[1] == "bot") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's automatic bot roles.").create();
						return true;
					}
					const role = helpers.toRole(args[2], e.guild);
					if (role == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role does not exist.").create();
						return true;
					}
					const roles = guilds.get(e.guild.id, "autoroles", "bot");
					const id = role.id;
					if (roles.indexOf(id) != -1) {
						roles.splice(roles.indexOf(id), 1);
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is no longer an automatic bot role.").create();
					} else {
						roles.push(id);
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is now an automatic bot role.").create();
					}
					return true;
				} else if (args.length == 1 && args[0] == "role") {
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
				} else if (args.length == 1 && args[0] == "inspect") {
					const data = guilds.data[e.guild.id].reactionroles;
					if (!Object.keys(data).length) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild has no role channels.").create();
						return true;
					}
					const items = [];
					Object.keys(data).forEach(item => {
						items.push("<#" + item + ">");
					});
					const text = items.join(" ");
					new utils.Embedded({
						channel: e.channel,
						user: e.user
					}, {
						title: "**Role Channels**",
						color: 0xFF33AA,
						desc: text
					}).create();
					return true;
				} else if (args.length == 2 && args[0] == "inspect") {
					const channel = helpers.toChannel(args[1]);
					if (channel == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That channel does not exist.").create();
						return true;
					}
					var data = guilds.data[e.guild.id].reactionroles;
					if (!(channel.id in data)) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That channel is not a role channel.").create();
						return true;
					}
					data = data[channel.id];
					if (!Object.keys(data).length) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This channel has no role messages.").create();
						return true;
					}
					const items = [];
					for (const [key, val] of Object.entries(data)) {
						var ref = "http://discordapp.com/channels/" + e.guild.id + "/" + channel.id + "/" + key;
						items.push("**[message](" + ref + ")** roles: " + val.length);
					}
					const text = items.join("\n");
					new utils.Embedded({
						channel: e.channel,
						user: e.user
					}, {
						title: "**Role Messages**",
						color: 0xFF33AA,
						desc: text
					}).create();
					return true;
				} else if (args.length == 3 && args[0] == "inspect") {
					const channel = helpers.toChannel(args[1]);
					if (channel == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That channel does not exist.").create();
						return true;
					}
					var data = guilds.data[e.guild.id].reactionroles;
					if (!(channel.id in data)) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That channel is not a role channel.").create();
						return true;
					}
					data = data[channel.id];
					const mid = args[2];
					if (!(mid in data)) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That message is not a role message.").create();
						return true;
					}
					data = data[mid];
					if (!data.length) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This message has no reaction roles.").create();
						return true;
					}
					const items = [];
					data.forEach(item => {
						items.push(item.emoji + " <@&" + item.role + ">");
					});
					const text = items.join("\n");
					new utils.Embedded({
						channel: e.channel,
						user: e.user
					}, {
						title: "**Reaction Roles**",
						color: 0xFF33AA,
						desc: text
					}).create();
					return true;
				} else if (args.length == 5 && args[0] == "role") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's free roles.").create();
						return true;
					}
					const role = helpers.toRole(args[1], e.guild);
					if (role == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role does not exist.").create();
						return true;
					}
					const chantext = args[2];
					const msgid = args[3];
					const emoji = args[4];
					const channel = helpers.toChannel(chantext);
					const chanid = channel.id;
					if (channel == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That channel does not exist.").create();
						return true;
					}
					const msg = await channel.messages.fetch(msgid);
					if (msg == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That message does not exist.").create();
						return true;
					}
					helpers.ensureReactionRoles(e.guild.id, chanid, msgid);
					const pairs = guilds.get(e.guild.id, "reactionroles", chanid, msgid);
					const index = pairs.findIndex(item => item.emoji == emoji && item.role == role.id);
					if (index == -1) {
						pairs.push({
							emoji, role: role.id
						});
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is now a reaction role.").create();
					} else {
						pairs.splice(index, 1);
						if (!pairs.length) {
							guilds.delete(e.guild.id, "reactionroles", chanid, msgid);
						}
						if (!Object.keys(guilds.get(e.guild.id, "reactionroles", chanid)).length) {
							guilds.delete(e.guild.id, "reactionroles", chanid);
						}
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is no longer a reaction role.").create();
					}
					return true;
				} else if (args.length == 2 && args[0] == "role") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's free roles.").create();
						return true;
					}
					const role = helpers.toRole(args[1], e.guild);
					if (role == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role does not exist.").create();
						return true;
					}
					const roles = guilds.get(e.guild.id, "freeroles");
					const id = role.id;
					if (roles.indexOf(id) != -1) {
						roles.splice(roles.indexOf(id), 1);
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is no longer a free role.").create();
					} else {
						roles.push(id);
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That role is now a free role.").create();
					}
					return true;
				}
			}
			return false;
		}
	}));
};