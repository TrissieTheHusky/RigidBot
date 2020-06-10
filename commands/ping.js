const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "ping",
		desc: "Displays the latency of the bot and api.",
		alias: ["latency", "latent", "pong"],
		usage: [
			"ping"
		],
		info: [
			"The ping command tells you the response time of the API, as well as the bot itself.",
			"This information is gathered from timestamps, as well as the API's ping property."
		],
		run: async e => {
			if (e.args.length > 0) {
				return false;
			}
			const bot = Date.now() - e.msg.createdTimestamp;
			const api = rigidbot.bot.ws.ping;
			utils.sendBox(e.channel, "Bot Latency", config.color("stat"), "Bot: " + bot + "\nAPI: " + api);
			return true;
		}
	}));
};