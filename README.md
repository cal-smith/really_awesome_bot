YESMAN! 2.0
==================

Yesman 2.0 is an IRC bot written in node. The core bot simply depends on [node-irc](https://github.com/martynsmith/node-irc). 

##Configuration

There really isn't much to configure. Sample config:

```json
{
	"name":"yesman",
	"server":"irc.reallyawesomedomain.com",
	"chan":["#main", "#yesman"]
}
```

- name: The username of the bot, and what it will respond to for command purposes.
- server: The irc server you want to connect to. Currently one server per bot.
- chan: Array of channels you want yesman active on.

##Plugins

Plugins export functionality *into* the core. Here's an example:

```JavaScript
module.exports = function (bot){
	bot.on("potato", function(message, from){
		bot.say("topato!");
	});
}
```

The key is

```
module.exports = function (bot){
```

That exports the plugin as a module the bot can call at any time, the `bot` argument is our way of passing functionality to you. Its a little ying/yang thing.

###Listening and Responding

you can either listen for messages directed to your plugin as commands:

```JavaScript
//listens for yesman <yourcommand> messages
bot.listen("CommandRegex", function(message, from){
	//callback function for your magic
});
```

or just get evey message:

```JavaScript
//can be used to implement entirely custom commands, or to match arbitrary words in messages
bot.on("Regex", function(message, from){
	//callback function for your magic
});
````

see `demo_plugins/` or the bundled `plugins/` directory for some sample plugins.

###Kinda Sorta Docs

`bot.listen(regex, callback)` If the bot recives a command and `regex` matches it, `callback` is called

`bot.on(regex, callback)` Whenever a message is recived `regex` is checked agaist it, and `callback` is invoked on matches.

`bot.say(message)` Send messages back

`bot.respond(message)` Send messages to the poor sod who dared talk to such a robot


##Help

First things first, make sure you installed node-irc and any dependancys plugins you may be using have. The fist part should be taken care of if you run `npm install` in the bot's directory.

*THINGS ARE FAILING AND EVERYTHING IS AWFUL*  
Either the node version you are using is horribly out of date and breaking everything, or *something* I am using is horribly out of date and breaking everything. Post an issue with your node version and what is breaking.

Need more immediate help? want to play with the latest yesman and break him? join irc.reallyawesomedomain.com #main and/or #yesman
