module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const users = rigidbot.configs.users;
	const config = rigidbot.configs.config;
	const utils = rigidbot.utils;
	
	bot.on("message", msg => {
		if (msg.author.bot) return;
		const user = msg.author;
		const uid = user.id;
		users.user(uid);
		const prev = users.get(uid, "xp-time");
		const next = new Date().getTime();
		if (prev < 0 || next - prev >= config.get("xp-delay")) {
			users.set(uid, "xp-time", next);
			utils.rewardEmbeds(msg.channel, user, utils.addXP(uid, 1));
		}
	});
	
};