module.exports = rigidbot => {
	const bot = rigidbot.bot;
	const utils = rigidbot.helpers = {};
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
		cfg.create(id, "channels", "join", null);
		cfg.create(id, "channels", "leave", null);
	};
	utils.ensureUser = id => {
		const cfg = rigidbot.configs.users;
		cfg.create(id, "balance", 0);
	};
	utils.mentionRegex = new RegExp('^\<@\!?([0-9]+)>$');
	utils.channelRegex = new RegExp('^\<\#([0-9]+)>$');
	utils.toMember = (input, guild) => {
		const matches = input.match(utils.mentionRegex);
		return matches ? guild.members.cache.get(matches[1]) : null;
	}
	utils.toUser = input => {
		const matches = input.match(utils.mentionRegex);
		return matches ? bot.users.cache.get(matches[1]) : null;
	}
	utils.toChannel = input => {
		const matches = input.match(utils.channelRegex);
		return matches ? bot.channels.cache.get(matches[1]) : null;
	}
};