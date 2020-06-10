module.exports = rigidbot => {
	
	const menus = [
		"pages",
		"items"
	];
	
	rigidbot.menus = {};
	rigidbot.menulist = [];
	rigidbot.Menu = require("./menu.js")(rigidbot);
	
	menus.forEach(menu => {
		require("./menus/" + menu + ".js")(rigidbot);
	});
	
}