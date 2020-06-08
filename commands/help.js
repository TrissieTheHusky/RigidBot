const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "help",
		usage: [
			"help",
			"help [command]"
		],
		info: [
			"Shows you information about a given command or a list of available commands and their descriptions."
		],
		desc: "Shows a list of commands.",
		run: async e => {
			if (e.args.length == 0) {
				const items = [];
				rigidbot.commands.forEach(cmd => {
					if (cmd.root) return;
					items.push("**" + cmd.name + ": **" + cmd.desc);
				});
				new utils.Items({
					channel: e.channel, user: e.user
				}, {
					items: items, embed: {
						color: 0xFF00FF,
						title: "**Commands**"
					}
				}).create();
			} else if (e.args.length == 1) {
				const name = e.args[0];
				var exists = false;
				var cmd = null;
				rigidbot.commands.forEach(item => {
					if (item.name.toLowerCase() == name && (!item.root || rigidbot.helpers.isRootUser(e.user))) {
						cmd = item;
					}
				});
				if (cmd == null) {
					rigidbot.commands.forEach(item => {
						item.alias.forEach(alias => {
							if (alias.toLowerCase() == name && (!item.root || rigidbot.helpers.isRootUser(e.user))) {
								cmd = item;
							}
						});
					});
				}
				if (cmd != null) {
					if (cmd.info.length > 0) {
						hasinfo = true;
						new utils.Pages({
							channel: e.channel, user: e.user
						}, {
							pages: cmd.info, embed: {
								color: 0xFF0000,
								title: "**Info: __" + name.toLowerCase() + "__**"
							}
						}).create();
					} else {
						new utils.Message({
							channel: e.channel,
							user: e.user
						}, "That command has no info pages.").create();
					}
				} else {
					new utils.Message({
						channel: e.channel,
						user: e.user
					}, "That command does not exist.").create();
				}
			} else {
				return false;
			}
			return true;
		}
	}));
}