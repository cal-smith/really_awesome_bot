//list all commands from plugins that export their command name (module.exports.command)
module.exports = function(bot){
	bot.listen("plugins", function(message){
		var response = "Plugins: ";
		for (var i = 0; i < bot.plugins.length; i++) {
			if (typeof bot.plugins[i].command !== "undefined"){
				i === bot.plugins.length ? response += bot.plugins[i].command : response += bot.plugins[i].command + ", ";
			}
		}
		bot.say(response);
	});
}