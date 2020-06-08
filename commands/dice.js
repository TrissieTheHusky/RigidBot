const Command = require("../command.js");
module.exports = rigidbot => {
	const utils = rigidbot.utils;
	rigidbot.commands.push(new Command({
		name: "dice",
		desc: "Performs the rolling of a given dice expression.",
		usage: [
			"dice d[n] + [n] - d[n]",
			"dice d6 + 3",
			"dice d20"
		],
		alias: ["roll", "diceroll", "rolldice"],
		run: async e => {
			if (e.args.length == 0) {
				return false;
			}
			var res = 0;
			var action = "+";
			var success = true;
			var mode = true;
			var iters = 0;
			var maxiters = 256;
			for (var i = 0; i < e.args.length; i++) {
				const arg = e.args[i].toLowerCase();
				if (!mode) {
					action = arg;
					mode = true;
					continue;
				}
				var cur = 0;
				const pos = +arg;
				if (pos == pos && pos >= 0) {
					cur = pos;
				} else {
					const sides = arg.split(/[dD]/);
					if (sides.length != 2 && sides.length != 1) {
						success = false;
						break;
					}
					var amt = sides[0];
					if (amt.trim() == "") {
						amt = "1";
					}
					const ind = +amt;
					const dice = sides[1];
					const size = +dice;
					if (ind == ind && ind >= 0 && size == size && size > 0) {
						for (var i = 0; i < ind; i++) {
							iters++;
							if (iters > maxiters) {
								success = false;
								break;
							}
							cur += Math.floor(Math.random() * size) + 1;
						}
						if (!success) break;
					} else {
						success = false;
						break;
					}
				}
				if (action == "+") {
					res += cur;
				} else if (action == "-") {
					res -= cur;
				}
				mode = false;
			}
			if (!success && iters <= maxiters) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "That is an invalid dice expression.").create();
				return true;
			} else if (!success) {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "You may not perform that many calculations.").create();
				return true;
			} else {
				new utils.Message({
					channel: e.channel,
					user: e.user
				}, "The result of that dice roll was **" + res + "**.").create();
				return true;
			}
		}
	}));
};