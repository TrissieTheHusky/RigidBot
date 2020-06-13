module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const guilds = rigidbot.configs.guilds;
	const utils = rigidbot.utils;
	
	bot.on("messageReactionAdd", async (reaction, user) => {
		if (reaction.message.partial) {
			try {
				reaction.message.fetch();
			} catch(e) {
				return;
			}
		}
		if (reaction.partial) {
			try {
				reaction.fetch();
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
				if (utils.sameEmoji(utils.toEmoji(emoji, o.guild), reaction.emoji)) {
					const option = poll.options[emoji];
					option.count++;
					hit = true;
				}
			});
			if (hit) {
				const u = bot.users.cache.get(poll.user);
				if (u == null) return;
				o.edit({
					embed: utils.pollEmbed(u, poll)
				});
			} else {
				reaction.remove(user);
			}
		}
	});
	bot.on("messageReactionRemove", async (reaction, user) => {
		if (reaction.partial) {
			try {
				reaction.fetch();
			} catch(e) {
				return;
			}
		}
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
				if (utils.sameEmoji(utils.toEmoji(emoji, o.guild), reaction.emoji)) {
					const option = poll.options[emoji];
					option.count--;
					hit = true;
				}
			});
			if (hit) {
				const u = bot.users.cache.get(poll.user);
				if (u == null) return;
				o.edit({
					embed: utils.pollEmbed(u, poll)
				});
			} else {
				reaction.remove(user);
			}
		}
	});
	
};