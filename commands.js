module.exports = rigidbot => {
	rigidbot.commands = [];
	const list = [
		"help",
		"eval",
		"support",
		"prefix",
		"ping",
		"stats",
		"purge",
		"kick",
		"ban",
		"unban",
		"balance",
		"pay",
		"dice",
		"coin"
	];
	list.forEach(name => {
		require("./commands/" + name + ".js")(rigidbot);
	});
};