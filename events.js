module.exports = rigidbot => {
	
	const events = [
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