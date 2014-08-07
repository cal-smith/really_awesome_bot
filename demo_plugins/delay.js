module.exports = function (bot){
	bot.on("delay", function(message, from){
		setTimeout(function(){
			bot.say("k from: "+from);
		}, 5000);
	});
}