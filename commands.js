module.exports = rigidbot => {
	rigidbot.commands = [];
	const list = [
		"help",
		"eval",
		"support",
		"version",
		"changelog",
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
		"balance",
		"pay",
		"dice",
		"coin"
	];
	list.forEach(name => {
		require("./commands/" + name + ".js")(rigidbot);
	});
};