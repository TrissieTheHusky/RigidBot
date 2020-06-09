
module.exports = [
	{
		name: "Introductory Update",
		version: "v1.1B",
		changes: [
			add("poll command"),
			add("role command"),
			add("warn command"),
			add("history command"),
			add("version command"),
			add("automatic role config"),
			add("reaction role config")
		]
	}, {
		name: "Introductory Update",
		version: "v1.1A",
		changes: [
			add("help command"),
			add("support command"),
			add("changelog command"),
			add("config command"),
			add("ping command"),
			add("stats command"),
			add("purge command"),
			add("kick command"),
			add("ban command"),
			add("unban command"),
			add("info command"),
			add("balance command"),
			add("pay command"),
			add("dice command"),
			add("coin command"),
			add("economy"),
			add("join messages"),
			add("leave messages")
		]
	}
];

function add(name) {
	return "+ **" + name + "**.";
}
function remove(name) {
	return "- **" + name + "**.";
}
function fix(thing) {
	if (thing != undefined) {
		return "Fixed **" + thing + "**.";
	} else {
		return "Bug fixes.";
	}
}
function tweak(thing) {
	if (thing != undefined) {
		return "Tweaked **" + thing + "**.";
	} else {
		return "Small tweaks.";
	}
}
function overhaul(thing) {
	if (thing != undefined) {
		return "Overhauled **" + thing + "**.";
	} else {
		return "General overhaul.";
	}
}