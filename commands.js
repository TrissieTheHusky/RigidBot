module.exports = rigidbot => {
	rigidbot.commands = [];
	const list = [
		"help",
		"aliases",
		"eval",
		"support",
		"suggest",
		"version",
		"changelog",
		"devlog",
		"preset",
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
		"embed",
		"dice",
		"coin"
	];
	list.forEach(name => {
		require("./commands/" + name + ".js")(rigidbot);
	});
};