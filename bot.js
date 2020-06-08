const Discord = require("discord.js");
const Client = Discord.Client;
const bot = new Client();

const Config = require("./config.js");

const rigidbot = {};
rigidbot.bot = bot;
rigidbot.commands = [];
rigidbot.configs = {};
rigidbot.configs.config = new Config("config.json");
rigidbot.configs.guilds = new Config("guilds.json");
rigidbot.helpers = {};
rigidbot.helpers.users = {};
rigidbot.helpers.users.root = id => {
	return id == 332914508395839490 || id == 713654447796125757;
}
rigidbot.helpers.guilds = {};
rigidbot.helpers.guilds.ensure = id => {
	rigidbot.configs.guilds.create(
		id, "symbol",
		rigidbot.configs.config.get("symbol")
	);
};

rigidbot.utils = require("./utils.js")(bot);

require("dotenv").config();
require("./events.js")(rigidbot);
[ "help", "eval", "support", "prefix", "ping", "purge", "kick", "ban", "unban", "dice", "coinflip"
].forEach(name => require("./commands/" + name + ".js")(rigidbot));

bot.login(process.env.TOKEN);

process.on('unhandledRejection', (error, p) => {
	console.log('=== UNHANDLED REJECTION ===');
	console.dir(error.stack);
});