const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const users = rigidbot.configs.users;
	const config = rigidbot.configs.config;
	rigidbot.commands.push(new Command({
		name: "experience",
		desc: "Shows the experience and levels that you or another user has.",
		alias: ["xp", "exp", "lvl", "level"],
		usage: [
			"experience",
			"experience [user]"
		],
		info: [
			"The experience command displays useful statistics about a user's current xp amount, level, and progress. You get experience by actively using the bot.",
			"Once you obtain enough xp, you will level up. When this happens, your xp will be reset and you will receive awards such as coins or items."
		],
		run: async e => {
			if (e.args.length > 1) {
				return false;
			}
			const ch = e.channel;
			const user = e.args.length ? utils.toUser(e.args[0]) : e.user;
			if (user == null || user == undefined) {
				utils.sendErr(ch, "Cannot get the balance of an unknown user.");
				return true;
			}
			const id = user.id;
			users.user(id);
			const xp = users.get(id, "xp");
			const level = users.get(id, "level");
			utils.sendBox(ch, "**Experience: __" + user.username + "__**",  config.color("stat"),
				"**Level:** " + level + "\n**XP:** " + xp + "/" + utils.levelGoal(level)
			);
			return true;
		}
	}));
};