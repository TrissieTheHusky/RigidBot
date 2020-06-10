const Command = require("../command.js");
const devlog = require("../devlog.js");
module.exports = rigidbot => {
	const menus = rigidbot.menus;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "devlog",
		alias: [
			"dlog",
			"developerlog",
			"developmentlog",
			"devlogs",
			"developerlogs",
			"developmentlogs",
			"dlogs"
		],
		usage: [
			"devlog"
		],
		desc: "Shows the developers' stories about their progress and experience with the bot.",
		run: e => {
			if (e.args.length) return false;
			const pages = [];
			devlog.forEach(item => {
				var text = "__" + item.date + "__";
				text += "\n\n";
				text += item.log.join("\n\n");
				pages.push(text);
			});
			new menus.Pages({
				channel: e.channel,
				user: e.user
			}, {
				pages: pages,
				embed: {
					title: "**Dev Log**",
					color: config.color("info")
				}
			}).create();
			return true;
		}
	}));
};
