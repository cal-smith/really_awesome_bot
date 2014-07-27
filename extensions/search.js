module.exports = function (bot){
	bot.listen("search", function(message, from){
		var search = encodeURIComponent(message);
		bot.say(from + " Searched for: https://www.google.ca/search?q=" + search);
	});
}