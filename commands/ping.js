const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
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
			new utils.Embedded({
				channel: e.channel,
				user: e.user
			}, {
				title: "***Latency***",
				color: 0x99FF00,
				desc: "Bot: " + bot + "\n"
					+ "API: " + api
			}).create();
			return true;
		}
	}));
};