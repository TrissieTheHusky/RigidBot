module.exports = rigidbot => {
	const bot = rigidbot.bot;
	const utils = rigidbot.helpers = {};

	utils.pollEmbed = (user, poll) => {
		const menus = rigidbot.utils;
		const lines = [];
		for (const [key, val] of Object.entries(poll.options)) {
			lines.push(key + " **" + val.name + "**: __" + val.count + " Votes__");
		}
		return menus.embed({
			title: "**Poll: __" + poll.title + "__**",
			color: 0x55FF55,
			desc: lines.join("\n"),
			author: user.username,
			authorIcon: user.displayAvatarURL()
		});
	};

	utils.messageAt = async (c, m) => {
		return await bot.channels.cache.get(c).messages.fetch(m);
	};
	utils.sameEmoji = (a, b) => {
		return (a.id && b.id && a.id == b.id) || a == b.name || b == a.name || a == b;
	};
	utils.hasPerm = (member, permission) => {
		return member.hasPermission(permission) || utils.isRootUser(member.user.id);
	};
	utils.isRootUser = id => {
		return id == "332914508395839490" || id == "713654447796125757";
	};
	utils.ensureConfig = () => {
		const cfg = rigidbot.configs.config;
		cfg.create("symbol", "$");
	};
	utils.ensureLogs = () => {
		const cfg = rigidbot.configs.logs;
		cfg.create("joins", []);
		cfg.create("leaves", []);
		cfg.create("member-joins", []);
		cfg.create("member-leaves", []);
	};
	utils.ensureGuild = id => {
		const cfg = rigidbot.configs.guilds;
		const main = rigidbot.configs.config;
		cfg.create(id, "symbol", main.get("symbol"));
		cfg.create(id, "messages", "join", null);
		cfg.create(id, "messages", "leave", null);
		cfg.create(id, "message-channel", null);
		cfg.create(id, "autoroles", "user", []);
		cfg.create(id, "autoroles", "bot", []);
		cfg.create(id, "freeroles", []);
		cfg.create(id, "reactionroles", {});
		cfg.create(id, "polls", {});
		cfg.create(id, "poll-channel", null);
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
	utils.ensureReactionRoles = (guild, channel, message) => {
		const cfg = rigidbot.configs.guilds;
		cfg.create(guild, "reactionroles", channel, message, []);
	};
	utils.ensureHistory = (guild, user) => {
		const log = rigidbot.configs.logs;
		log.create("history", guild.id, user.id, []);
	};
	utils.logHistory = (guild, user, type, reason, duration) => {
		const log = rigidbot.configs.logs;
		const gid = guild.id;
		utils.ensureGuild(gid);
		utils.ensureHistory(guild, user);
		log.get("history", gid, user.id).unshift({
			id: user.id,
			type, reason, duration
		});
	};
	utils.ensureUser = id => {
		const cfg = rigidbot.configs.users;
		cfg.create(id, "balance", 0);
	};
	utils.mentionRegex = new RegExp('^\<@\!?([0-9]+)>$');
	utils.channelRegex = new RegExp('^\<\#([0-9]+)>$');
	utils.roleRegex = new RegExp('^\<\@&([0-9]+)>$');
	utils.emojiRegex = new RegExp('^\<\:[^:]+\:([0-9]+)>$');
	utils.toEmoji = (input, guild) => {
		const matches = input.match(utils.emojiRegex);
		return matches ? guild.emojis.cache.get(matches[1]) : input;
	}
	utils.toMember = (input, guild) => {
		const matches = input.match(utils.mentionRegex);
		return matches ? guild.members.cache.get(matches[1]) : guild.members.cache.find(member => member.displayName == input);
	}
	utils.toRole = (input, guild) => {
		const matches = input.match(utils.roleRegex);
		return matches ? guild.roles.cache.get(matches[1]) : guild.roles.cache.find(role => role.name == input);
	}
	utils.toUser = input => {
		const matches = input.match(utils.mentionRegex);
		return matches ? bot.users.cache.get(matches[1]) : bot.users.cache.find(user => user.username == input);
	}
	utils.toChannel = input => {
		const matches = input.match(utils.channelRegex);
		return matches ? bot.channels.cache.get(matches[1]) : bot.channels.cache.find(channel => channel.name == input);
	}
};