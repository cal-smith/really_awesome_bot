YESMAN!
==================

Yesman is an IRC bot written in node. The core bot simply depends on [node-irc](https://github.com/martynsmith/node-irc).

Yesman supports "plugins" and "extensions". A plugin is a JSON file that allows for simple call-response style commands. An extension adds to the plugin architecture, and at its simplest is just a program that prints a string to stdout. Parsing of the plugin command is done via regex, allowing for partial matching or wildcard style matching.

##Configuration

There really isn't much to configure. Sample config:

```json
{
	"name":"yesman",
	"server":"irc.reallyawesomedomain.com",
	"chan":["#main", "#yesman"],
	"op":"hansolo669",
	"windows":true
}
```

- name: The username of the bot, and what it will respond to for command purposes.
- server: The irc server you want to connect to. Currently one server per bot.
- chan: Array of channels you want yesman active on.
- op: Users authorized to reload plugins.
- windows: true|false. Fixes a silly bug that shouldnt happen when running interpreters via command on Windows.

##Plugins

Plugins are very straight forward, take for example the default help plugin(help.json):

```json
{
	"command":"help",
	"response":"I am yesman. Commands can be listed with 'yesman commands'. Additional help can be recived with 'yesman <command here> help'.",
	"help":"this command already provides help. simply issue: yesman help"
}
```

To break things down:

- command: specifics the command the plugin will respond to
- response: the command response
- help: relevent help on the command

see `demo_plugins/` or the bundled `plugins/' directory for some sample plugins.

A useful help text should be provided with every plugin.

##extensions

Extensions are fairly straight forward as well. They simply add another component and a few more options to the plugin system. Every extension comes in two parts: a plugin, and a related script. it is preferable to keep the plugin and extension naming the similar, if not the same (ex: myext.json, myext.js). Extensions are whole self contained scripts/executables with their own dependencies, and are simply run by yesman which captures the output and prints it when the extension has exited.

A sample node script looks like:

hello.json:  
```json
{
	"command":"hello",
	"type":"node",
	"execute":"hello.js",
	"help":"Hello World extension!"
}
```

hello.js:
```JavaScript
console.log("Hello World!");
```

To break things down:

- command: specifies the command the plugin will respond to
- type: the type of script we are executing. can be Ruby, Node, Python, or bash scripts [ruby|rb|js|node|javascript|bash|sh|shell|python|py]
- execute: file to execute
- help: useful help text

You can also add a `response` and it will output before the program executes. This is a good idea on long running programs where the final response may take some time (ie: "response":"Loading...").

Any output (console.log, puts, printf) will be taken by yesman as a response, and output to irc. For example:

```ruby
puts "I am an external Ruby script"
puts "yay"
```
would print:

```
<yesman> I am an external Ruby script
<yesman> yay
```

This functionality allows for all sorts of interesting scripts to be built, go wild!

##Help

*An extension isn't running?*  
Make sure you have the relevant plugin installed and you have run `yesman reload`. If your extension lacks a plugin, either make one, or bug the maintainer until they do it.

*THINGS ARE FAILING AND EVERYTHING IS AWFUL*  
Either the node version you are using is horribly out of date and breaking everything, or *something* I am using is horribly out of date and breaking everything. Post an issue with your node version and what is breaking.

None of the above applicable? Need more immediate help? want to play with yesman and break him as I'm working on stuff? join irc.reallyawesomedomain.com #main and/or #yesman
