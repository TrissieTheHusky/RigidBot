module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const logs = rigidbot.configs.logs;
	const guilds = rigidbot.configs.guilds;
	
	bot.on("guildCreate", guild => {
		logs.get("joins").push({
			time: Date.now(),
			name: guild.name,
			id: guild.id
		});
	});
	bot.on("guildDelete", guild => {
		logs.get("leaves").push({
			time: Date.now(),
			name: guild.name,
			id: guild.id
		});
		guilds.delete(guild.id);
	});
	
};