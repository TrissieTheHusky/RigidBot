const repl = require("./repl.js");
require("dotenv").config();

const bot = new (require("discord.js").Client)({
	partials: [
		"MESSAGE",
		"CHANNEL",
		"REACTION"
	]
});
const rigidbot = {bot};

require("./configs.js")(rigidbot);
require("./utils.js")(rigidbot);
require("./menus.js")(rigidbot);
require("./commands.js")(rigidbot);
require("./items.js")(rigidbot);
require("./events.js")(rigidbot);

bot.login(process.env.TOKEN);

process.on("unhandledRejection", error => {
	console.dir(error.stack);
});

repl.run(rigidbot);