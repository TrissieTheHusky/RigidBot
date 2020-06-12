module.exports = rigidbot => {
	
	const events = [
		"experience",
		"commands",
		"guilds",
		"logging",
		"menus",
		"polls",
		"reactionroles",
		"userflow"
	];
	
	events.forEach(event => {
		require("./events/" + event + ".js")(rigidbot);
	});
	
};