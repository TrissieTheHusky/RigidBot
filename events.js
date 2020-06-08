module.exports = rigidbot => {
	const bot = rigidbot.bot;
	const utils = rigidbot.utils;
	bot.once("ready", async () => {
		rigidbot.helpers.ensureConfig();
		await bot.user.setPresence({
			activity: {
				name: "$help",
				type: "WATCHING"
			},
			status: "online"
		});
		console.log("RigidBot has been initialized.");
	});
	bot.on("guildCreate", guild => {
		console.log("Joined: " + guild.name);
	});
	bot.on("guildDelete", guild => {
		console.log("Left: " + guild.name);
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
						if (e.member.hasPermission(command.perms) || isRootUser(e.user)) {
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