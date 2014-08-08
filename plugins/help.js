//if a plugin exports help (module.exports.help) respond with that
module.exports = function(bot){
	bot.listen("help", function (message) {
		var help = message.split(" ");
		if (!help[0]){
			bot.say('I am ' + bot.name + '. Type "' + bot.name + ' commands" to list avliable commands, or "' + bot.name + ' help <command>" for help with specific commands. Visit https://github.com/hansolo669/really_awesome_bot for info about my circuits.');
		} else {
			for (var i = 0; i < bot.plugins.length; i++) {//loops through the plugins till it finds the correct one, then outputs its help contents
				if (bot.plugins[i].command === help[0]){
					bot.say(bot.plugins[i].help);
				}
			}
		}
	});
}