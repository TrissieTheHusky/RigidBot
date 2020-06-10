module.exports = rigidbot => {
	rigidbot.commands = [];
	const list = [
		"help",
		"aliases",
		"eval",
		"support",
		"version",
		"changelog",
		"devlog",
		"config",
		"role",
		"ping",
		"stats",
		"purge",
		"history",
		"warn",
		"kick",
		"ban",
		"unban",
		"info",
		"poll",
		"backpack",
		"balance",
		"pay",
		"dice",
		"coin"
	];
	list.forEach(name => {
		require("./commands/" + name + ".js")(rigidbot);
	});
};