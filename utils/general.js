module.exports = rigidbot => {
	
	const utils = rigidbot.utils;
	
	utils.listState = (wl, bl, md, item) => {
		return md ? (wl.indexOf(item) != -1) : (bl.indexOf(item) == -1);
	};

	utils.toFeature = name => {
		if (name == "xp") return name;
		return null;
	}
	
	utils.toCommand = name => {
		name = name.toLowerCase().trim();
		var res = null;
		rigidbot.commands.forEach(cmd => {
			if (cmd.name.toLowerCase() == name) {
				res = cmd;
			}
		});
		rigidbot.commands.forEach(cmd => {
			cmd.alias.forEach(alias => {
				if (alias.toLowerCase() == name) {
					res = cmd;
				}
			});
		});
		return res;
	};
	
	utils.pollEmbed = (user, poll) => {
		const menus = rigidbot.utils;
		const lines = [];
		for (const [key, val] of Object.entries(poll.options)) {
			lines.push(key + " **" + val.name + "**: __" + val.count + " Votes__");
		}
		return {
			title: "**Poll: __" + poll.title + "__**",
			color: 0x55FF55,
			description: lines.join("\n"),
			author: {
				name: user.username,
				url: user.displayAvatarURL()
			}
		};
	};

	utils.messageAt = async (c, m) => {
		return await bot.channels.cache.get(c).messages.fetch(m);
	};
	utils.sameEmoji = (a, b) => {
		return (a.id && b.id && a.id == b.id) || a == b.name || b == a.name || a == b;
	};
	utils.findPollAt = (guild, channel, message) => {
		const cfg = rigidbot.configs.guilds;
		utils.ensureGuild(guild);
		const g = cfg.data[guild];
		const p = g.polls;
		if (!(channel in p)) return null;
		const c = p[channel];
		if (!(message in c)) return null;
		const m = c[message];
		return m;
	};
	utils.closePollAt = (guild, channel, message) => {
		const cfg = rigidbot.configs.guilds;
		utils.ensureGuild(guild);
		const g = cfg.data[guild];
		const p = g.polls;
		if (!(channel in p)) return;
		const c = p[channel];
		if (!(message in c)) return;
		delete c[message];
		if (!Object.keys(c).length) {
			delete p[channel];
		}
	}
	
};