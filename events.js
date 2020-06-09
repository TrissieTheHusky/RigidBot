module.exports = rigidbot => {
	const bot = rigidbot.bot;
	const utils = rigidbot.utils;
	const helpers = rigidbot.helpers;
	const logs = rigidbot.configs.logs;
	const guilds = rigidbot.configs.guilds;
	bot.once("ready", async () => {
		rigidbot.helpers.ensureConfig();
		rigidbot.helpers.ensureLogs();
		await bot.user.setPresence({
			activity: {
				name: "$help",
				type: "WATCHING"
			},
			status: "online"
		});
		console.log("RigidBot has been initialized.");
	});
	bot.on("guildMemberAdd", member => {
		logs.get("member-joins").push({
			time: Date.now(),
			name: member.user.tag,
			id: member.id,
			guild: member.guild.id,
			server: member.guild.name
		});
		const gid = member.guild.id;
		helpers.ensureGuild(gid);
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
		logs.get("member-leaves").push({
			time: Date.now(),
			name: member.user.tag,
			id: member.id,
			guild: member.guild.id,
			server: member.guild.name
		});
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
				const items = content.split(/ +/);
				const name = items[0];
				const args = items.slice(1);
				const e = {
					msg: msg,
					text: content,
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