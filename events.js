module.exports = rigidbot => {
	const bot = rigidbot.bot;
	const utils = rigidbot.utils;
	const helpers = rigidbot.helpers;
	const logs = rigidbot.configs.logs;
	const guilds = rigidbot.configs.guilds;
	bot.once("ready", async () => {
		helpers.ensureConfig();
		helpers.ensureLogs();
		await bot.user.setPresence({
			activity: {
				name: "$help",
				type: "WATCHING"
			},
			status: "online"
		});
		console.log("RigidBot has been initialized.");
	});
	bot.on("messageReactionAdd", async (reaction, user) => {
		if (reaction.message.partial) {
			try {
				reaction.message.fetch();
			} catch(e) {
				return;
			}
		}
		if (user.bot) return;
		const o = reaction.message;
		const g = o.guild.id;
		const c = o.channel.id;
		const m = o.id;
		if (guilds.has(g, "polls", c, m)) {
			var hit = false;
			const poll = guilds.get(g, "polls", c, m);
			Object.keys(poll.options).forEach(emoji => {
				if (helpers.sameEmoji(helpers.toEmoji(emoji, o.guild), reaction.emoji)) {
					const option = poll.options[emoji];
					option.count = reaction.count - 1;
					hit = true;
				}
			});
			if (hit) {
				const u = bot.users.cache.get(poll.user);
				if (u == null) return;
				o.edit(helpers.pollEmbed(u, poll));
			} else {
				reaction.remove(user);
			}
		}
	});
	bot.on("messageReactionRemove", async (reaction, user) => {
		if (reaction.message.partial) {
			try {
				reaction.message.fetch();
			} catch(e) {
				return;
			}
		}
		if (user.bot) return;
		const o = reaction.message;
		const g = o.guild.id;
		const c = o.channel.id;
		const m = o.id;
		if (guilds.has(g, "polls", c, m)) {
			var hit = false;
			const poll = guilds.get(g, "polls", c, m);
			Object.keys(poll.options).forEach(emoji => {
				if (helpers.sameEmoji(helpers.toEmoji(emoji, o.guild), reaction.emoji)) {
					const option = poll.options[emoji];
					option.count = reaction.count - 1;
					hit = true;
				}
			});
			if (hit) {
				const u = bot.users.cache.get(poll.user);
				if (u == null) return;
				o.edit(helpers.pollEmbed(u, poll));
			} else {
				reaction.remove(user);
			}
		}
	});
	bot.on("messageReactionAdd", async (reaction, user) => {
		if (reaction.message.partial) {
			try {
				reaction.message.fetch();
			} catch(e) {
				return;
			}
		}
		const o = reaction.message;
		const g = o.guild.id;
		const c = o.channel.id;
		const m = o.id;
		const member = await o.guild.members.fetch(user.id);
		helpers.ensureReactionRoles(g, c, m);
		const roles = guilds.get(g, "reactionroles", c, m);
		roles.forEach(pair => {
			if (helpers.sameEmoji(helpers.toEmoji(pair.emoji, o.guild), reaction.emoji)) {
				const role = o.guild.roles.cache.get(pair.role);
				if (role != null) {
					member.roles.add(role);
				}
			}
		});
	});
	bot.on("messageReactionRemove", async (reaction, user) => {
		if (reaction.message.partial) {
			try {
				reaction.message.fetch();
			} catch(e) {
				return;
			}
		}
		const o = reaction.message;
		const g = o.guild.id;
		const c = o.channel.id;
		const m = o.id;
		const member = await o.guild.members.fetch(user.id);
		helpers.ensureReactionRoles(g, c, m);
		const roles = guilds.get(g, "reactionroles", c, m);
		roles.forEach(pair => {
			if (helpers.sameEmoji(helpers.toEmoji(pair.emoji, o.guild), reaction.emoji)) {
				const role = o.guild.roles.cache.get(pair.role);
				if (role != null) {
					member.roles.remove(role);
				}
			}
		});
	});
	bot.on("guildMemberAdd", member => {
		const gid = member.guild.id;
		helpers.ensureGuild(gid);
		const roles = guilds.get(gid, "autoroles", member.user.bot ? "bot" : "user");
		member.roles.add(roles);
		const channelid = guilds.get(gid, "message-channel");
		if (channelid == null) return;
		const channel = bot.channels.cache.get(channelid);
		if (channel == null) return;
		var message = guilds.get(gid, "messages", "join");
		if (message == null) return;
		if (message == "") return;
		message = message.replace(/\{name\}/g, member.displayName);
		message = message.replace(/\{guild\}/g, member.guild.name);
		message = message.replace(/\{user\}/g, member.user.name);
		message = message.replace(/\{tag\}/g, member.user.tag);
		message = message.replace(/\{mention\}/g, "<@" + member.user.id + ">");
		message = message.replace(/\{ping\}/g, "<@" + member.user.id + ">");
		channel.send(message);
	});
	bot.on("guildMemberRemove", member => {
		const gid = member.guild.id;
		helpers.ensureGuild(gid);
		const channelid = guilds.get(gid, "message-channel");
		if (channelid == null) return;
		const channel = bot.channels.cache.get(channelid);
		if (channel == null) return;
		var message = guilds.get(gid, "messages", "leave");
		if (message == null) return;
		if (message == "") return;
		message = message.replace(/\{name\}/g, member.displayName);
		message = message.replace(/\{guild\}/g, member.guild.name);
		message = message.replace(/\{user\}/g, member.user.name);
		message = message.replace(/\{tag\}/g, member.user.tag);
		message = message.replace(/\{mention\}/g, "<@" + member.user.id + ">");
		message = message.replace(/\{ping\}/g, "<@" + member.user.id + ">");
		channel.send(message);
	});
	bot.on("guildCreate", guild => {
		logs.get("joins").push({
			time: Date.now(),
			name: guild.name,
			id: guild.id
		});
	});
	bot.on("guildDelete", guild => {
		logs.get("leaves").push({
			time: Date.now(),
			name: guild.name,
			id: guild.id
		});
	});
	bot.on("message", async msg => {
		if (msg.author.bot) return;
		if (msg.guild != null) {
			const guild = msg.guild.id;
			rigidbot.helpers.ensureGuild(guild);
			const symbol = rigidbot.configs.guilds.get(guild, "symbol");
			var content = msg.content;
			const botId = bot.user.id;
			const mention1 = "<@" + botId + ">";
			const mention2 = "<@!" + botId + ">";
			var matches = true;
			if (content.startsWith(symbol)) {
				content = content.slice(symbol.length);
			} else if (content.startsWith(mention1)) {
				content = content.slice(mention1.length);
			} else if (content.startsWith(mention2)) {
				content = content.slice(mention2.length);
			} else {
				matches = false;
			}
			if (matches) {
				content = content.trim();
				const items = content.split(" ");
				const name = items[0];
				const args = items.slice(1);
				const e = {
					msg: msg,
					text: msg.content,
					guild: msg.guild,
					channel: msg.channel,
					user: msg.author,
					member: msg.member,
					name: name,
					args: args
				};
				var command;
				for (var i = rigidbot.commands.length - 1; i >= 0; i--) {
					const cmd = rigidbot.commands[i];
					if (cmd.name == name) {
						command = cmd;
						break;
					}
				}
				if (command == undefined) {
					for (var i = rigidbot.commands.length - 1; i >= 0; i--) {
						const cmd = rigidbot.commands[i];
						var match = false;
						for (const alias of cmd.alias) {
							if (alias != name) continue;
							command = cmd;
							match = true;
							break;
						}
						if (match) break;
					}
				}
				if (command != undefined) {
					if (!command.root || rigidbot.helpers.isRootUser(e.user)) {
						if (e.member.hasPermission(command.perms) || rigidbot.helpers.isRootUser(e.user)) {
							const flag = await command.run(e);
							if (!flag) {
								new utils.Items({
									channel: e.channel, user: e.user
								}, {
									items: command.usage, embed: {
										color: 0xFF7722,
										title: "**Usage: __" + name.toLowerCase() + "__**"
									}
								}).create();
							}
						} else {
							new utils.Message({
								channel: e.channel,
								user: e.user
							}, "You do not have permission to use this command.").create();
						}
					}
				}
			}
		}
	});
};