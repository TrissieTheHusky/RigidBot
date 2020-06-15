const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	const suggest = rigidbot.configs.suggest;
	rigidbot.commands.push(new Command({
		name: "suggest",
		alias: ["suggestion", "idea", "submitidea", "suggestidea", "request", "suggestions", "ideas", "requests"],
		desc: "Sends the developers a maximum of eight suggestions.",
		usage: [
			"suggest [message...]"
		],
		info: [
			"Your suggestions will be deleted once they have been reviewed. There is a maximum of 200 characters per suggestion and 8 suggestions per user."
		],
		run: async e => {
			if (e.args.length == 0) {
				suggest.user(e.user.id);
				const items = suggest.get(e.user.id);
				const text = items.join("\n");
				utils.sendBox(e.channel, "Suggestions", config.color("stat"), text);
			} else {
				const text = e.args.join(" ");
				if (text.length > 200) {
					utils.sendErr(e.channel, "Your suggestion is too long. The limit is 200 characters.");
					return true;
				}
				const res = suggest.submit(e.user.id, text, 8);
				utils.sendBox(e.channel, "Suggestions", config.color("done"), "You have submitted your suggestion." + (res.post <= res.pre ? " Old suggestions have been removed." : ""));
			}
			return true;
		}
	}));
};