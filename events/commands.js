module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const guilds = rigidbot.configs.guilds;
	const menus = rigidbot.menus;
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	
	bot.on("message", async msg => {
		if (msg.author.bot) return;
		if (msg.guild != null) {
			const guild = msg.guild.id;
			guilds.guild(guild);
			const symbol = guilds.get(guild, "symbol");
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
					if (!command.root || utils.rootUser(e.user)) {
						if (utils.hasPerm(e.member, command.perms)) {
							const flag = await command.run(e);
							if (!flag) {
								new menus.Items({
									channel: e.channel, user: e.user
								}, {
									items: command.usage, embed: {
										color: config.color("error"),
										title: "**Usage: __" + name.toLowerCase() + "__**"
									}
								}).create();
							}
						} else {
							e.error("You do not have permission to use this command.");
						}
					}
				}
			}
		}
	});
	
};