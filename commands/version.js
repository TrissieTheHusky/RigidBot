const Command = require("../command.js");
const changelog = require("../changelog.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
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
			new utils.Embedded({
				channel: e.channel,
				user: e.user
			}, {
				title: "**" + changelog[0].name + "**",
				desc: "This bot is currently on **" + changelog[0].version + "**. You can use the __changelog__ command to see a list of changes.",
				color: 0x00AA66
			}).create();
			return true;
		}
	}));
};