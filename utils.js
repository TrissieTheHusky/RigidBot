module.exports = rigidbot => {
	
	const utils = [
		"general",
		"identify",
		"parsers",
		"content"
	];
	
	rigidbot.utils = {};
	
	utils.forEach(util => {
		require("./utils/" + util + ".js")(rigidbot);
	});
	
};