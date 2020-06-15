const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const guilds = rigidbot.configs.guilds;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "config",
		usage: [
			"config prefix [text...]",
			"config join [message...]",
			"config leave [message...]",
			"config welcome [channel]",
			"config polls [channel]",
			"config role [role]",
			"config role [role] [channel] [message] [emoji]",
			"config auto user [role]",
			"config auto bot [role]",
			"config inspect",
			"config inspect [channel]",
			"config inspect [channel] [message]",
			"config mode channel [mode]",
			"config mode command [mode]",
			"config mode feature [mode]",
			"config whitelist channel [channel]",
			"config whitelist command [command]",
			"config whitelist feature [feature]",
			"config blacklist channel [channel]",
			"config blacklist command [command]",
			"config blacklist feature [feature]"
		],
		immune: true,
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
					const current = guilds.get(e.guild.id, "messages", "join");
					var text = args.slice(1).join(" ");
					if (text == current) {
						text = null;
					}
					guilds.set(e.guild.id, "messages", "join", text);
					if (text == null) {
						utils.sendBox(e.channel, "Message Removed", config.color("done"), "The join message has been removed from this guild.");
					} else {
						utils.sendBox(e.channel, "Join Message", config.color("done"), text);
					}
					return true;
				} else if (args.length > 1 && args[0] == "leave") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's join message.");
						return true;
					}
					const current = guilds.get(e.guild.id, "messages", "leave");
					var text = args.slice(1).join(" ");
					if (text == current) {
						text = null;
					}
					guilds.set(e.guild.id, "messages", "leave", text);
					if (text == null) {
						utils.sendBox(e.channel, "Message Removed", config.color("done"), "The leave message has been removed from this guild.");
					} else {
						utils.sendBox(e.channel, "Leave Message", config.color("done"), text);
					}
					return true;
				} else if (args.length == 1 && args[0] == "welcome") {
					const channel = guilds.get(e.guild.id, "message-channel");
					if (channel == null) {
						utils.sendErr(e.channel, "This guild's welcome channel has not been set.");
					} else {
						utils.sendBox(e.channel, "Welcome Channel", config.color("stat"), "This guild's welcome channel is <#" + channel + ">");
					}
					return true;
				} else if (args.length == 2 && args[0] == "welcome") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to set the guild's welcome channel.");
						return true;
					}
					const text = args[1];
					const channel = utils.toChannel(text);
					if (!channel) {
						utils.sendErr(e.channel, "That is an invalid channel.");
						return true;
					}
					if (guilds.get(e.guild.id, "message-channel") == null) {
						guilds.set(e.guild.id, "message-channel", channel.id);
						utils.sendBox(e.channel, "Welcome Channel", config.color("done"), "This guild's welcome channel has been set to <#" + channel.id + ">");
					} else {
						guilds.set(e.guild.id, "message-channel", null);
						utils.sendBox(e.channel, "Welcome Channel", config.color("done"), "This guild's welcome channel has been unset.");
					}
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
					if (!channel) {
						utils.sendErr(e.channel, "That is an invalid channel.");
						return true;
					}
					if (guilds.get(e.guild.id, "poll-channel") == null) {
						guilds.set(e.guild.id, "poll-channel", channel.id);
						utils.sendBox(e.channel, "Poll Channel", config.color("done"), "This guild's poll channel has been set to <#" + channel.id + ">");
					} else {
						guilds.set(e.guild.id, "poll-channel", null);
						utils.sendBox(e.channel, "Poll Channel", config.color("done"), "This guild's poll channel has been unset.");
					}
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
						utils.sendBox(e.channel, "Free Roles", config.color("done"), "<@&" + id + "> is no longer a free role.");
					} else {
						roles.push(id);
						utils.sendBox(e.channel, "Free Roles", config.color("done"), "<@&" + id + "> is now a free role.");
					}
					return true;
				} else if (args.length == 3 && args[0] == "whitelist" && args[1] == "command") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to whitelist a command.");
						return true;
					}
					const cmd = utils.toCommand(args[2]);
					if (cmd == null) {
						utils.sendErr(e.channel, "That command does not exist.");
						return true;
					}
					const list = guilds.get(e.guild.id, "command-whitelist");
					const index = list.indexOf(cmd.name);
					if (index == -1) {
						list.push(cmd.name);
						utils.sendBox(e.channel, "Command Whitelist", config.color("done"), "The **" + cmd.name + "** command is now whitelisted.");
					} else {
						list.splice(index, 1);
						utils.sendBox(e.channel, "Command Whitelist", config.color("done"), "The **" + cmd.name + "** command is no longer whitelisted.");
					}
					return true;
				} else if (args.length == 2 && args[0] == "whitelist" && args[1] == "command") {
					const list = guilds.get(e.guild.id, "command-whitelist");
					utils.sendBox(e.channel, "Command Whitelist", config.color("stat"), list.join(", "));
					return true;
				} else if (args.length == 3 && args[0] == "blacklist" && args[1] == "command") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to blacklist a command.");
						return true;
					}
					const cmd = utils.toCommand(args[2]);
					if (cmd == null) {
						utils.sendErr(e.channel, "That command does not exist.");
						return true;
					}
					const list = guilds.get(e.guild.id, "command-blacklist");
					const index = list.indexOf(cmd.name);
					if (index == -1) {
						list.push(cmd.name);
						utils.sendBox(e.channel, "Command Blacklist", config.color("done"), "The **" + cmd.name + "** command is now blacklisted.");
					} else {
						list.splice(index, 1);
						utils.sendBox(e.channel, "Command Blacklist", config.color("done"), "The **" + cmd.name + "** command is no longer blacklisted.");
					}
					return true;
				} else if (args.length == 2 && args[0] == "blacklist" && args[1] == "command") {
					const list = guilds.get(e.guild.id, "command-blacklist");
					utils.sendBox(e.channel, "Command Blacklist", config.color("stat"), list.join(", "));
					return true;
				} else if (args.length == 2 && args[0] == "mode" && args[1] == "command") {
					utils.sendBox(e.channel, "Command Mode", config.color("stat"), "Commands are currently using a " + (guilds.get(e.guild.id, "command-mode") ? "whitelist" : "blacklist"));
					return true;
				} else if (args.length == 3 && args[0] == "mode" && args[1] == "command") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to change the command mode.");
						return true;
					}
					var mode = false;
					if (args[2] == "whitelist") {
						mode = true;
					} else if (args[2] == "blacklist") {
						mode = false;
					} else {
						utils.sendErr(e.channel, "You must set the mode to whitelist or a blacklist.");
						return true;
					}
					guilds.set(e.guild.id, "command-mode", mode);
					utils.sendBox(e.channel, "Command Mode", config.color("done"), "Commands are now using a " + (mode ? "whitelist" : "blacklist"));
					return true;
				} else if (args.length == 3 && args[0] == "whitelist" && args[1] == "feature") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to whitelist a feature.");
						return true;
					}
					const name = utils.toFeature(args[2]);
					if (name == null) {
						utils.sendErr(e.channel, "There are no whitelistable features yet.");
						return true;
					}
					const list = guilds.get(e.guild.id, "feature-whitelist");
					const index = list.indexOf(name);
					if (index == -1) {
						list.push(name);
						utils.sendBox(e.channel, "Feature Whitelist", config.color("done"), "The **" + name + "** feature is now whitelisted.");
					} else {
						list.splice(index, 1);
						utils.sendBox(e.channel, "Feature Whitelist", config.color("done"), "The **" + name + "** feature is no longer whitelisted.");
					}
					return true;
				} else if (args.length == 2 && args[0] == "whitelist" && args[1] == "feature") {
					const list = guilds.get(e.guild.id, "feature-whitelist");
					utils.sendBox(e.channel, "Feature Whitelist", config.color("stat"), list.join(", "));
					return true;
				} else if (args.length == 3 && args[0] == "blacklist" && args[1] == "feature") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to blacklist a feature.");
						return true;
					}
					const name = utils.toFeature(args[2]);
					if (name == null) {
						utils.sendErr(e.channel, "There are no blacklistable features yet.");
						return true;
					}
					const list = guilds.get(e.guild.id, "feature-blacklist");
					const index = list.indexOf(name);
					if (index == -1) {
						list.push(name);
						utils.sendBox(e.channel, "Feature Blacklist", config.color("done"), "The **" + name + "** feature is now blacklisted.");
					} else {
						list.splice(index, 1);
						utils.sendBox(e.channel, "Feature Blacklist", config.color("done"), "The **" + name + "** feature is no longer blacklisted.");
					}
					return true;
				} else if (args.length == 2 && args[0] == "blacklist" && args[1] == "feature") {
					const list = guilds.get(e.guild.id, "feature-blacklist");
					utils.sendBox(e.channel, "Feature Blacklist", config.color("stat"), list.join(", "));
					return true;
				} else if (args.length == 2 && args[0] == "mode" && args[1] == "feature") {
					utils.sendBox(e.channel, "Feature Mode", config.color("stat"), "Features are currently using a " + (guilds.get(e.guild.id, "feature-mode") ? "whitelist" : "blacklist"));
					return true;
				} else if (args.length == 3 && args[0] == "mode" && args[1] == "feature") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to change the feature mode.");
						return true;
					}
					var mode = false;
					if (args[2] == "whitelist") {
						mode = true;
					} else if (args[2] == "blacklist") {
						mode = false;
					} else {
						utils.sendErr(e.channel, "You must set the mode to whitelist or a blacklist.");
						return true;
					}
					guilds.set(e.guild.id, "feature-mode", mode);
					utils.sendBox(e.channel, "Feature Mode", config.color("done"), "Features are now using a " + (mode ? "whitelist" : "blacklist"));
					return true;
				} else if (args.length == 3 && args[0] == "whitelist" && args[1] == "channel") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to whitelist a channel.");
						return true;
					}
					const channel = utils.toChannel(args[2]);
					if (channel == null) {
						utils.sendErr(e.channel, "That channel does not exist.");
						return true;
					}
					const list = guilds.get(e.guild.id, "channel-whitelist");
					const index = list.indexOf(channel.id);
					if (index == -1) {
						list.push(channel.id);
						utils.sendBox(e.channel, "Channel Whitelist", config.color("done"), "The <#" + channel.id + "> channel is now whitelisted.");
					} else {
						list.splice(index, 1);
						utils.sendBox(e.channel, "Channel Whitelist", config.color("done"), "The <#" + channel.id + "> channel is no longer whitelisted.");
					}
					return true;
				} else if (args.length == 2 && args[0] == "whitelist" && args[1] == "channel") {
					const list = guilds.get(e.guild.id, "channel-whitelist");
					utils.sendBox(e.channel, "Channel Whitelist", config.color("stat"), list.join(", "));
					return true;
				} else if (args.length == 3 && args[0] == "blacklist" && args[1] == "channel") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to blacklist a channel.");
						return true;
					}
					const channel = utils.toChannel(args[2]);
					if (channel == null) {
						utils.sendErr(e.channel, "That channel does not exist.");
						return true;
					}
					const list = guilds.get(e.guild.id, "channel-blacklist");
					const index = list.indexOf(channel.id);
					if (index == -1) {
						list.push(channel.id);
						utils.sendBox(e.channel, "Channel Blacklist", config.color("done"), "The <#" + channel.id + "> channel is now blacklisted.");
					} else {
						list.splice(index, 1);
						utils.sendBox(e.channel, "Channel Blacklist", config.color("done"), "The <#" + channel.d + "> channel is no longer blacklisted.");
					}
					return true;
				} else if (args.length == 2 && args[0] == "blacklist" && args[1] == "channel") {
					const list = guilds.get(e.guild.id, "channel-blacklist");
					utils.sendBox(e.channel, "Channel Blacklist", config.color("stat"), list.join(", "));
					return true;
				} else if (args.length == 2 && args[0] == "mode" && args[1] == "channel") {
					utils.sendBox(e.channel, "Channel Mode", config.color("stat"), "Channels are currently using a " + (guilds.get(e.guild.id, "channel-mode") ? "whitelist" : "blacklist"));
					return true;
				} else if (args.length == 3 && args[0] == "mode" && args[1] == "channel") {
					if (!utils.hasPerm(e.member, "MANAGE_GUILD")) {
						utils.sendErr(e.channel, "You do not have permission to change the channel mode.");
						return true;
					}
					var mode = false;
					if (args[2] == "whitelist") {
						mode = true;
					} else if (args[2] == "blacklist") {
						mode = false;
					} else {
						utils.sendErr(e.channel, "You must set the mode to whitelist or a blacklist.");
						return true;
					}
					guilds.set(e.guild.id, "channel-mode", mode);
					utils.sendBox(e.channel, "Channel Mode", config.color("done"), "Channels are now using a " + (mode ? "whitelist" : "blacklist"));
					return true;
				}
			}
			return false;
		}
	}));
};
