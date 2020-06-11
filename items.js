module.exports = rigidbot => {

	const items = [
		"wood"
	];

	rigidbot.items = {};
	
	items.forEach(name => {
		require("./items/" + name + ".js")(rigidbot);
	});

};