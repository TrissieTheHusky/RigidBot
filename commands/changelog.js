const Command = require("../command.js");
const changelog = require("../changelog.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "changelog",
		alias: [
			"changes",
			"changelogs",
			"chlog",
			"chlogs"
		],
		usage: [
			"changelog"
		],
		desc: "Shows the versions of the bot and the changes made along the way.",
		run: e => {
			if (e.args.length) {
				return false;
			}
			const pages = [];
			changelog.forEach(item => {
				var text = "__" + item.name + "__: **" + item.version + "**";
				text += "\n\n";
				text += item.changes.join("\n");
				pages.push(text);
			});
			new utils.Pages({
				channel: e.channel,
				user: e.user
			}, {
				pages: pages,
				embed: {
					title: "**Change Log**",
					color: 0x4444FF
				}
			}).create();
			return true;
		}
	}));
};