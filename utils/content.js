module.exports = rigidbot => {
	
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	
	utils.sendEmbed = (channel, embed) => {
		channel.send({embed});
	};
	utils.sendBox = (channel, title, color, description) => {
		utils.sendEmbed(channel, {
			title: "**" + title + "**",
			color, description
		});
	};
	utils.sendErr = (channel, error) => {
		utils.sendBox(channel, "Error", config.color("error"), error);
	};
	
};