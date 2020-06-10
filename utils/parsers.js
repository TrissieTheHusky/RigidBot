module.exports = rigidbot => {
	
	const utils = rigidbot.utils;
	const bot = rigidbot.bot;
	
	utils.userRegex = new RegExp('^\<@\!?([0-9]+)>$');
	utils.channelRegex = new RegExp('^\<\#([0-9]+)>$');
	utils.roleRegex = new RegExp('^\<\@&([0-9]+)>$');
	utils.emojiRegex = new RegExp('^\<\:[^:]+\:([0-9]+)>$');
	utils.toEmoji = (input, guild) => {
		const matches = input.match(utils.emojiRegex);
		return matches ? guild.emojis.cache.get(matches[1]) : input;
	}
	utils.toMember = (input, guild) => {
		const matches = input.match(utils.userRegex);
		return matches ? guild.members.cache.get(matches[1]) : guild.members.cache.find(member => member.displayName == input);
	}
	utils.toRole = (input, guild) => {
		const matches = input.match(utils.roleRegex);
		return matches ? guild.roles.cache.get(matches[1]) : guild.roles.cache.find(role => role.name == input);
	}
	utils.toUser = input => {
		const matches = input.match(utils.userRegex);
		return matches ? bot.users.cache.get(matches[1]) : bot.users.cache.find(user => user.username == input);
	}
	utils.toChannel = input => {
		const matches = input.match(utils.channelRegex);
		return matches ? bot.channels.cache.get(matches[1]) : bot.channels.cache.find(channel => channel.name == input);
	}
	
};