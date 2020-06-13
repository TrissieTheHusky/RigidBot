module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const guilds = rigidbot.configs.guilds;
	const menus = rigidbot.menus;
	const utils = rigidbot.utils;
	const users = rigidbot.configs.users;
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
				const command = utils.toCommand(name);
				const wl = guilds.get(guild, "command-whitelist");
				const bl = guilds.get(guild, "command-blacklist");
				const md = guilds.get(guild, "command-mode");
				if (command != null && (utils.listState(wl, bl, md, command.name) || command.immune)) {
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
							utils.sendErr(e.channel, "You do not have permission to use this command.");
						}
					}
				} else if (command != null) {
					utils.sendErr(e.channel, "This command is currently disabled.");
				}
			} else {
				const user = msg.author;
				const uid = user.id;
				users.user(uid);
				const prev = users.get(uid, "xp-time");
				const next = new Date().getTime();
				if (prev < 0 || next - prev >= config.get("xp-delay")) {
					users.set(uid, "xp-time", next);
					const res = utils.addXP(uid, 1);
					const wl = guilds.get(msg.guild.id, "feature-whitelist");
					const bl = guilds.get(msg.guild.id, "feature-blacklist");
					const md = guilds.get(msg.guild.id, "feature-mode");
					if (utils.listState(wl, bl, md, "xp")) {
						utils.rewardEmbeds(msg.channel, user, res);
					}
				}
			}
		}
	});
	
};