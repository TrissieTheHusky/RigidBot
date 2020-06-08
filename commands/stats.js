const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const bot = rigidbot.bot;
	rigidbot.commands.push(new Command({
		name: "stats",
		desc: "Displays statistics about the bot.",
		alias: ["statistics"],
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
			new utils.Items({
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
					color: 0xFF8800
				}
			}).create();
			return true;
		}
	}));
};