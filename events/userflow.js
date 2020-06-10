module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const guilds = rigidbot.configs.guilds;
	
	bot.on("guildMemberAdd", member => {
		const gid = member.guild.id;
		guilds.guild(gid);
		const roles = guilds.get(gid, "autoroles", member.user.bot ? "bot" : "user");
		member.roles.add(roles);
		const channelid = guilds.get(gid, "message-channel");
		if (channelid == null) return;
		const channel = bot.channels.cache.get(channelid);
		if (channel == null) return;
		var message = guilds.get(gid, "messages", "join");
		if (message == null) return;
		if (message == "") return;
		message = message.replace(/\{name\}/g, member.displayName);
		message = message.replace(/\{guild\}/g, member.guild.name);
		message = message.replace(/\{user\}/g, member.user.name);
		message = message.replace(/\{tag\}/g, member.user.tag);
		message = message.replace(/\{mention\}/g, "<@" + member.user.id + ">");
		message = message.replace(/\{ping\}/g, "<@" + member.user.id + ">");
		channel.send(message);
	});
	bot.on("guildMemberRemove", member => {
		const gid = member.guild.id;
		guilds.guild(gid);
		const channelid = guilds.get(gid, "message-channel");
		if (channelid == null) return;
		const channel = bot.channels.cache.get(channelid);
		if (channel == null) return;
		var message = guilds.get(gid, "messages", "leave");
		if (message == null) return;
		if (message == "") return;
		message = message.replace(/\{name\}/g, member.displayName);
		message = message.replace(/\{guild\}/g, member.guild.name);
		message = message.replace(/\{user\}/g, member.user.name);
		message = message.replace(/\{tag\}/g, member.user.tag);
		message = message.replace(/\{mention\}/g, "<@" + member.user.id + ">");
		message = message.replace(/\{ping\}/g, "<@" + member.user.id + ">");
		channel.send(message);
	});
	
};