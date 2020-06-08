module.exports = rigidbot => {
	const bot = rigidbot.bot;
	const utils = rigidbot.helpers = {};
	utils.isRootUser = id => {
		return id == "332914508395839490" || id == "713654447796125757";
	};
	utils.ensureConfig = () => {
		const cfg = rigidbot.configs.config;
		cfg.create("symbol", "$");
	};
	utils.ensureGuild = id => {
		const cfg = rigidbot.configs.guilds;
		const main = rigidbot.configs.config;
		cfg.create(id, "symbol", main.get("symbol"));
	};
	utils.ensureUser = id => {
		const cfg = rigidbot.configs.users;
		cfg.create(id, "balance", 0);
	};
	utils.mentionRegex = new RegExp('^\<@\!?([0-9]{18})>$');
	utils.toMember = (input, guild) => {
		const matches = input.match(utils.mentionRegex);
		return matches ? guild.members.cache.get(matches[1]) : null;
	}
	utils.toUser = input => {
		const matches = input.match(utils.mentionRegex);
		return matches ? bot.users.cache.get(matches[1]) : null;
	}
};