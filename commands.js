module.exports = rigidbot => {
	rigidbot.commands = [];
	const list = [
		"help",
		"eval",
		"support",
		"version",
		"changelog",
		"config",
		"ping",
		"stats",
		"purge",
		"kick",
		"ban",
		"unban",
		"info",
		"balance",
		"pay",
		"dice",
		"coin"
	];
	list.forEach(name => {
		require("./commands/" + name + ".js")(rigidbot);
	});
};