YESMAN!
==================

Yesman is an IRC bot written in node. The core bot simply depends on [node-irc 0.2.x](https://github.com/martynsmith/node-irc).

Yesman currently only responds to "yesman <command>".

Yesmans supports "plugins" and "extensions". A plugin is a JSON file that allows for simple call-response style commands. An extension adds to the plugin archtecture, and at its simplest is just a program that prints a string to stdout.

##Configuration

There really isn't much to configure. Sample config:

```json
{
	"chan":["#main", "#yesman"],
	"op":"hansolo669",
	"windows":true
}
```

- chan: array of channels you want yesman active on.
- op: users authorized to use advanced yesman features. Additonal security to be added.
- windows: true|false. There are a couple of things that just work better if we can target Windows. Linux/OS X do not have these issues.

##Writing Plugins

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

When issued `yesman <command>` yesman will respond with the related response text

A usefull help text should be provided with every plugin

Additional functionality is planned.

##Writing extensions

Extensions are fairly straight forward as well. They simply add another component and a few more options to the plugin system. Every extentsion comes in two parts: a plugin, and a related script. it is prefferable to keep the plugin and extension naming the similar, if not the same (ex: myext.json, myext.js). Extensions are whole self contained scripts, and are simply run by yesman.

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

- command: specifics the command the plugin will respond to
- type: the type of script we are executing. can be Ruby, Node, Python, or bash scripts [ruby|rb|js|node|javascript|bash|sh|shell|python|py]
- execute: file to execute
- help: usefull help text

Any output (console.log, puts, printf) will be taken by yesman as input, and output to irc as a result. For example:

```ruby
puts "I am an external Ruby script"
puts "yay"
```
would print:

```
<yesman> I am an external Ruby script
<yesman> yay
```

This funcationality allows for all sorts of interesting scripts to be built, go wild!

##Help

*Why node-irc 0.2.x?*  
Because it was installed and I haven't had time to update to the 0.3.x branch yet. I will. Promise!

*An extension isn't running?*  
Make sure you have the relevent plugin installed and you have run `yesman reload`. If your extension lacks a plugin, either make one, or bug the maintainer untill they do it.

*THINGS ARE FAILING AND EVERYTHING IS AWFUL*  
Either the node version you are using is horribly out of date and breaking everything, or *something* I am using is horribly out of date and breaking everything. Post an issue with your node version and what is breaking.

None of the above applicable? Need more immidiate help? want to play with yesman and break him as I'm working on stuff? join irc.reallyawesomedomain.com #main and/or #yesman
