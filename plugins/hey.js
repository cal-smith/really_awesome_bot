module.exports = function (bot){
	bot.on("hey robot", function(message, from){
		bot.respond("what?");
	});
}