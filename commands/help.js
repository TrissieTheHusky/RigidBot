const Command = require("../command.js");
module.exports = rigidbot => {
	const menus = rigidbot.menus;
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "help",
		usage: [
			"help",
			"help [command]"
		],
		immune: true,
		info: [
			"Shows you information about a given command or a list of available commands and their descriptions."
		],
		desc: "Shows a list of commands.",
		run: async e => {
			if (e.args.length == 0) {
				const items = [];
				rigidbot.commands.forEach(cmd => {
					if (!cmd.root || utils.rootUser(e.user)) {
						items.push("**" + cmd.name + ": **" + cmd.desc);
					}
				});
				new menus.Items({
					channel: e.channel, user: e.user
				}, {
					items: items, embed: {
						color: config.color("info"),
						title: "**Commands**"
					}
				}).create();
			} else if (e.args.length == 1) {
				const name = e.args[0];
				var exists = false;
				var cmd = null;
				rigidbot.commands.forEach(item => {
					if (item.name.toLowerCase() == name && (!item.root || utils.rootUser(e.user))) {
						cmd = item;
					}
				});
				if (cmd == null) {
					rigidbot.commands.forEach(item => {
						item.alias.forEach(alias => {
							if (alias.toLowerCase() == name && (!item.root || utils.rootUser(e.user))) {
								cmd = item;
							}
						});
					});
				}
				if (cmd != null) {
					if (cmd.info.length > 0) {
						new menus.Pages({
							channel: e.channel, user: e.user
						}, {
							pages: cmd.info, embed: {
								color: config.color("info"),
								title: "**Info: __" + name.toLowerCase() + "__**"
							}
						}).create();
					} else {
						utils.sendErr(e.channel, "That command has no info pages.");
					}
				} else {
					utils.sendErr(e.channel, "That command does not exist.");
				}
			} else {
				return false;
			}
			return true;
		}
	}));
}