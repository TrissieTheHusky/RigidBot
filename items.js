module.exports = rigidbot => {

	const items = [
		"wood",
		"rock",
		"brick",
		"sand",
		"clay",
		"cloth",
		"flax",
		"copper",
		"iron",
		"rope",
		"string",
		"yarn",
		"stick",
		"glass",
		"bottle"
	];

	rigidbot.items = {};
	require("./item.js")(rigidbot);
	
	items.forEach(name => {
		require("./items/" + name + ".js")(rigidbot);
	});

};