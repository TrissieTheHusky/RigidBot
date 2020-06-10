
module.exports = [
	{
		name: "Introductory Update",
		version: "v1.1R",
		date: "6/10/2020",
		changes: [
			add("devlog command"),
			add("aliases command"),
			overhaul("the backend"),
			tweak("color scheme"),
			fix()
		]
	}, {
		name: "Introductory Update",
		version: "v1.1B",
		date: "6/9/2020",
		changes: [
			add("poll command"),
			add("role command"),
			add("warn command"),
			add("history command"),
			add("version command"),
			add("automatic role config"),
			add("reaction role config"),
			tweak("config command"),
			fix()
		]
	}, {
		name: "Introductory Update",
		version: "v1.1A",
		date: "6/8/2020",
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
	return "+ **" + name + "**";
}
function remove(name) {
	return "- **" + name + "**";
}
function fix(thing) {
	if (thing != undefined) {
		return "fixed **" + thing + "**";
	} else {
		return "**bug fixes**";
	}
}
function tweak(thing) {
	if (thing != undefined) {
		return "**tweaked " + thing + "**";
	} else {
		return "**small tweaks**";
	}
}
function overhaul(thing) {
	if (thing != undefined) {
		return "**overhauled " + thing + "**";
	} else {
		return "**general overhaul**";
	}
}