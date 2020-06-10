const Command = require("../command.js");
const changelog = require("../changelog.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "version",
		usage: [
			"version"
		],
		desc: "Displays the current version.",
		run: e => {
			if (e.args.length) {
				return false;
			}
			utils.sendBox(e.channel, changelog[0].name, config.color("info"), "This bot is currently on **" + changelog[0].version + "**. You can use the __changelog__ command to see a list of changes.");
			return true;
		}
	}));
};