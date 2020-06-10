module.exports = rigidbot => {

	const items = [
		"wood"
	];

	rigidbot.items = {};

	require("./item.js")(rigidbot);

	items.forEach(name => {
		require("./items/" + name + ".js")(rigidbot);
	});

};