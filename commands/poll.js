const Command = require("../command.js");
module.exports = rigidbot => {
	const bot = rigidbot.bot;
	const utils = rigidbot.utils;
	const guilds = rigidbot.configs.guilds;
	rigidbot.commands.push(new Command({
		name: "poll",
		alias: ["polls", "vote", "votes"],
		desc: "Manages reaction based polls with an optional time limit.",
		usage: [
			"poll [message...]",
			"_place options on new lines following the command_",
			"format: [emoji] [option...]"
		],
		run: async e => {
			if (e.args.length == 0) return false;
			const text = e.args.join(" ");
			const lines = text.split(/[\t ]*\n[\t ]*/);
			if (lines.length < 2) return false;
			const title = lines[0].trim();
			const optionlines = lines.slice(1);
			const options = {};
			optionlines.forEach(optionline => {
				const data = optionline.split(" ");
				if (data.length < 2) {
					return;
				}
				const left = data[0];
				const right = data.slice(1);
				options[left] = {
					name: right.join(" ").trim(),
					count: 0
				};
			});
			var channelid = guilds.get(e.guild.id, "poll-channel");
			if (channelid == null) {
				channelid = e.channel.id;
			}
			const channel = bot.channels.cache.get(channelid);
			if (channel == null) {
				utils.sendErr(e.channel, "That channel does not exist.");
				return true;
			}
			const poll = {
				title, options,
				user: e.user.id
			};
			const pollmessage = await channel.send({
				embed: utils.pollEmbed(e.user, poll)
			});
			Object.keys(options).forEach(async emoji => {
				await pollmessage.react(utils.toEmoji(emoji, e.guild));
			});
			guilds.set(e.guild.id, "polls", channelid, pollmessage.id, poll);
			return true;
		}
	}));
};
