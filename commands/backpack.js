const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	const config = rigidbot.configs.config;
	const users = rigidbot.configs.users;
	rigidbot.commands.push(new Command({
		name: "backpack",
		alias: ["bpack", "bp", "items", "inv", "inventory"],
		desc: "Displays the contents of your inventory.",
		usage: [
			"backpack"
		],
		run: async e => {
			if (e.args.length != 0) {
				return false;
			}
			const items = [];
			const user = e.user;
			users.user(user.id);
			const backpack = users.get(user.id, "backpack");
			backpack.items.forEach(slot => {
				const item = rigidbot.items[slot.id];
				const name = item.name;
				const emoji = item.emoji;
				items.push("**" + slot.quantity + "x** " + emoji + " " + name);
			});
			const text = items.join("\n");
			utils.sendBox(e.channel, "Backpack: __" + users.spaceTaken(user.id) + " / " + users.totalSpace(user.id) + "__", config.color("stat"), text);
			return true;
		}
	}));
};