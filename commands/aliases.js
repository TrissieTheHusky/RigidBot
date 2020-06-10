const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "aliases",
		usage: [
			"aliases",
			"aliases [command]"
		],
		info: [
			"Shows you the aliases that you can use for a given command, or a list of every alias and command name that you can use. To get information on a command, use the __help__ command."
		],
		desc: "Shows the aliases of commands.",
		run: async e => {
			if (e.args.length == 0) {
				const items = [];
				rigidbot.commands.forEach(cmd => {
					if (!cmd.root || utils.rootUser(e.user)) {
						items.push("**" + cmd.name + "**");
						cmd.alias.forEach(alias => {
							items.push(alias);
						});
					}
				});
				utils.sendBox(e.channel, "Aliases", config.color("info"), items.join(", "));
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
					if (cmd.alias.length > 0) {
						const items = cmd.alias.slice();
						items.unshift("**" + cmd.name + "**");
						utils.sendBox(e.channel, "Aliases: __" + cmd.name + "__", config.color("info"), items.join(", "));
					} else {
						utils.sendErr(e.channel, "That command has no aliases.");
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