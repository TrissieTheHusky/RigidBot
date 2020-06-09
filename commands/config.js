const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const guilds = rigidbot.configs.guilds;
	const helpers = rigidbot.helpers;
	rigidbot.commands.push(new Command({
		name: "config",
		usage: [
			"config guild prefix",
			"config guild prefix [text]",
			"config guild message join",
			"config guild message join [message]",
			"config guild message leave",
			"config guild message leave [message]",
			"config guild channel join",
			"config guild channel join [mention]",
			"config guild channel leave",
			"config guild channel leave [mention]"
		],
		alias: ["cfg", "setup", "settings"],
		desc: "Manages settings for guilds, channels, users, and more.",
		run: async e => {
			const args = e.args;
			if (args.length > 0 && args[0] == "guild") {
				if (args.length == 2 && args[1] == "prefix") {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's prefix is " + guilds.get(e.guild.id, "symbol")).create();
					return true;
				} else if (args.length == 3 && args[1] == "prefix") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's prefix.").create();
						return true;
					}
					const text = args[2]
					guilds.set(e.guild.id, "symbol", text);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's prefix is now " + text).create();
					return true;
				} else if (args.length == 3 && args[1] == "message" && args[2] == "join") {
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
				} else if (args.length == 3 && args[1] == "message" && args[2] == "leave") {
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
				} else if (args.length > 3 && args[1] == "message" && args[2] == "join") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's join message.").create();
						return true;
					}
					const text = args.slice(3).join(" ");
					guilds.set(e.guild.id, "messages", "join", text);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's join message has been set.").create();
					return true;
				} else if (args.length > 3 && args[1] == "message" && args[2] == "leave") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's leave message.").create();
						return true;
					}
					const text = args.slice(3).join(" ");
					guilds.set(e.guild.id, "messages", "leave", text);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's leave message has been set.").create();
					return true;
				} else if (args.length == 3 && args[1] == "channel" && args[2] == "join") {
					const channel = guilds.get(e.guild.id, "channels", "join");
					if (channel == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's join channel has not been set.").create();
					} else {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's join channel is <#" + channel + ">").create();
					}
					return true;
				} else if (args.length == 3 && args[1] == "channel" && args[2] == "leave") {
					const channel = guilds.get(e.guild.id, "channels", "leave");
					if (channel == null) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's leave channel has not been set.").create();
					} else {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "This guild's leave channel is <#" + channel + ">").create();
					}
					return true;
				} else if (args.length == 4 && args[1] == "channel" && args[2] == "join") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's join channel.").create();
						return true;
					}
					const text = args[3];
					const channel = helpers.toChannel(text);
					guilds.set(e.guild.id, "channels", "join", channel.id);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's join channel has been set to <#" + channel.id + ">").create();
					return true;
				} else if (args.length == 4 && args[1] == "channel" && args[2] == "leave") {
					if (!helpers.hasPerm(e.member, "MANAGE_GUILD")) {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "You do not have permission to set the guild's leave channel.").create();
						return true;
					}
					const text = args[3];
					const channel = helpers.toChannel(text);
					guilds.set(e.guild.id, "channels", "leave", channel.id);
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "This guild's leave channel has been set to <#" + channel.id + ">").create();
					return true;
				}
			}
			return false;
		}
	}));
};