require("dotenv").config();
const bot = new (require("discord.js").Client);
const rigidbot = {bot};

require("./configs.js")(rigidbot);
require("./helpers.js")(rigidbot);
require("./utils.js")(rigidbot);
require("./commands.js")(rigidbot);
require("./events.js")(rigidbot);

bot.login(process.env.TOKEN);

process.on('unhandledRejection', (error, p) => {
	console.log('=== UNHANDLED REJECTION ===');
	console.dir(error.stack);
});