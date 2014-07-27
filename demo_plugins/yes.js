module.exports = function (bot){
	bot.listen(".*", function(message, from){
		bot.say("yes");
	});
}