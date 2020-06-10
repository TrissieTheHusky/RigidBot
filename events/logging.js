module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const config = rigidbot.configs.config;
	const logs = rigidbot.configs.logs;
	
	bot.once("ready", async () => {
		config.setup();
		logs.setup();
		await bot.user.setPresence({
			activity: {
				name: "$help",
				type: "WATCHING"
			},
			status: "online"
		});
		console.log("RigidBot has been initialized.");
	});
	
};