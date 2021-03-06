
module.exports = [
	{
		name: "Customization Update",
		version: "v1.2B",
		date: "6/14/2020",
		changes: [
			add("embed command"),
			add("suggest command"),
			add("channel whitelist/blacklist"),
			remove("balance command"),
			remove("pay command"),
			remove("experience command"),
			remove("backpack command"),
			remove("all items"),
			remove("experience system"),
			remove("item system"),
			remove("economy system"),
			remove("levelup system"),
			remove("item payments")
		]
	}, {
		name: "Customization Update",
		version: "v1.2A",
		date: "6/12/2020",
		changes: [
			add("preset command"),
			add("experience command"),
			add("backpack command"),
			add("config enhancements"),
			add("whitelist/blacklist systems"),
			add("experience system"),
			add("item system"),
			add("levelup system"),
			add("item payments"),
			add("glass/bottle items"),
			add("brick/clay items"),
			add("cloth/yarn items"),
			add("copper/iron items"),
			add("flax/string items"),
			add("rock/wood items"),
			add("rope/stick items"),
			add("sand/wood items"),
			fix()
		]
	}, {
		name: "Introductory Update",
		version: "v1.1R",
		date: "6/10/2020",
		changes: [
			add("devlog command"),
			add("aliases command"),
			add("more descriptions"),
			overhaul("the backend"),
			tweak("color scheme"),
			tweak("response layout"),
			tweak("changelog format"),
			fix("command info"),
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
			add("economy system"),
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
		return "+ **fixed " + thing + "**";
	} else {
		return "+ **bug fixes**";
	}
}
function tweak(thing) {
	if (thing != undefined) {
		return "+ **tweaked " + thing + "**";
	} else {
		return "+ **small tweaks**";
	}
}
function overhaul(thing) {
	if (thing != undefined) {
		return "+ **overhauled " + thing + "**";
	} else {
		return "+ **general overhaul**";
	}
}