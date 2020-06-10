const Command = require("../command.js");
module.exports = rigidbot => {
	const menus = rigidbot.menus;
	const bot = rigidbot.bot;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "stats",
		desc: "Displays statistics about the bot.",
		alias: [
			"statistics",
			"stat",
			"statistic"
		],
		usage: [
			"stats"
		],
		info: [
			"This command shows general statistics about RigidBot, its guilds, users, etc."
		],
		run: async e => {
			if (e.args.length > 0) {
				return false;
			}
			const guilds = bot.guilds.cache;
			const channels = bot.channels.cache;
			const users = bot.users.cache;
			new menus.Items({
				channel: e.channel,
				user: e.user
			}, {
				items: [
					"**Guilds**: " + guilds.size,
					"**Channels**: " + channels.size,
					"**Users**: " + users.size,
				],
				embed: {
					title: "**Bot Statistics**",
					color: config.color("stat")
				}
			}).create();
			return true;
		}
	}));
};