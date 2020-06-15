const Config = require("./config.js");
module.exports = rigidbot => {
	const cfg = rigidbot.configs = {};
	const list = [
		"config",
		"guilds",
		"logs",
		"suggest"
	];
	list.forEach(name => {
		cfg[name] = new (require("./configs/" + name + ".js")(rigidbot))();
	});
}