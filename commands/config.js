const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
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
			"config channel"
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
				}
			}
			return false;
		}
	}));
};