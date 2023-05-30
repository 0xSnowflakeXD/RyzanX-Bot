console.clear()

const lginStart = new Date().getTime()

const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js')
const { promisify } = require('util')
const { EventEmitter } = require('events')
const requiredir = require('require-dir')
const color = require('colors')
const os = require('os')

// Handlers
const mh = require('./handler/memhandler')
// const ch = require('./handler/cpuhandler')
// Handlers End

// const cslog = console.log.bind()
// console.log = () => {
// 	let args = new Array(arguments)
// 	args.forEach(a => {
// 		process.stdout.write(a)
// 	})
// }

requiredir('./server')

setInterval(() => {
	const x = new mh.Memory().check(32692269664, function(totalmem, freemem, usedmem) {
		console.warn(`-- MEMORY USAGE CAUTION --
Caught on: ${Date()}
Details: Memory use exceeded Repl's limit

Memory Usage: ${usedmem}
Total Repl Memory: ${totalmem}
Memory left: ${freemem}
-- END --
`)
	})
}, 5000)

const exthandler = new EventEmitter()

// Cheating exceptions

process.on('uncaughtException', (e) => {
	console.log(e)
	require('./rsAssist.js')
})

const command = []
const slashCommand = []
const devs = ['927563409409581066','810221998881898507']

// Replit shutdown cheat
// function extcall() {require('./rsAssist.js')}

// let bext = 1000 * 60

// setInterval(extcall, bext)
// Replit shutdown cheat end

const c = new Client({intents:
	[
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers, 
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
	]
})

c.login(process.env['tk'])

c.on('ready', () => {
	// ----
	globalThis.lginEnd = new Date().getTime()
	// ----
	c.user.setActivity({name: "Stay with Ukraine!", type: ActivityType.Watching})
	process.stdout.write(`${color.blue(c.user.tag)} ${color.brightGreen('is ready!')}\n`)
	process.stdout.write(`\nUser status in raw:\n${color.cyan(c.user.presence)}\n`)
});

async function create(handler, cb) {
	command.push({cn:handler, cb:cb})
}

c.on('messageCreate', async msg => {
	command.forEach(c => {
		const args = msg.content.split(' ')
		
		let prefix = 'rx'
		if(!msg.content.startsWith(prefix)) return false;
		if(msg.author.bot === true) return false;

		if(args[1].toLowerCase() == c.cn.toLowerCase() && c.cb) {
			c.cb(msg, args)
		}
	})
})

create('hi', (msg) => {
	msg.channel.send('Hello!')
})

create('dev', (msg, args) => {
	if(!args[2]) {
		msg.channel.send(`**Developer Corner**
These commands is designed for our Developers.

rx dev trace: Return useful bot info for investigating.
rx dev guilds: Return list of guilds in format: \`Name: \${g.name} | ID: \${g.id})\`.
rx dev users: Return cached users (for investigating purposes).
rx dev devs: Return developers in their IDs and name (If they are cached or reaching them is possible).
rx dev eval: Execute code.
rx dev stop: Stop the bot.
rx dev restart: Restart the bot.
rx dev crash: Crash the bot to see if it is restarting.
rx dev add: Add a developer to temporatily memory.
rx dev rem: Remove a developer from temporatily memory
`)
	} else {
		if(!devs.includes(msg.author.id)) {msg.channel.send('YOU ARE NOT PERMITTED TO PEFORM THIS ACTION'); return false}
		if(args[2] == 'trace' && args[1] == 'dev') {
			console.log(`-- Bot Trace Data --
Load Time:
  |- Login + Code Reading    : ${globalThis.lginEnd - lginStart}
  |- Memory Handler Load Time: Coming soon.
Uptime:
  |- System Uptime Milliseconds: ${os.uptime() * 100}
  |- Bot Uptime Milliseconds   : ${c.uptime}
  \\- Ready On                  : ${c.readyAt}
Repl:
  |- CPU Usage      : ${process.cpuUsage()}
  |- Memory         :
	  |- Freemem      : ${os.freemem()}
      \\- Total Memory: ${os.totalmem()}
	  \\- Storage        : Coming soon.
Client:
  |- Username      : ${c.user.username}
  |- Tag           : ${c.user.tag}
  |- Status        : ${c.user.presence.status.toString()}
    \\- Status Message: ${c.user.presence.activities[0].name.toString()}
 -- Bot Trace Data End --
 Data request: ${msg.author.tag} (${msg.author.id})
 Execution Date: ${Date()}`)
			msg.channel.send('Sucessful logged bot data to Console.')
		}
		if(args[2] == 'add' && args[1] == 'dev') {
			devs.push(msg.mentions.users.first().id)
		}
		if(args[2] == 'rem' && args[1] == 'dev') {
			dev.forEach(d => {if(msg.mentions.users.first().id) {d = null}})
		}
		if(args[2] == 'guilds' && args[1] == 'dev') {
			c.guilds.cache.forEach(g => msg.channel.send(`Name: ${g.name} | ID: ${g.id}`))
		}
		if(args[2] == 'users' && args[1] == 'dev') {
			c.users.cache.forEach(u => msg.channel.send(`Username#Tag: ${u.tag} | ID: ${u.id}`))
		}
		if(args[2] == 'devs' && args[1] == 'dev') {
			devs.forEach(d => msg.channel.send(d))
		}
		if(args[2] == 'eval' && args[1] == 'dev') {
			let out;
			try {
				let code = msg.content.split(' ').slice(3).join(" ")
				out = eval(code) // Eval the splitted code
				if (out.toString() == '') out = '[Empty Code Input]'
				if(out.toString() == 'undefined' || !out.toString()) {
					out = 'undefined'
				}
				if (out instanceof Object && !(out instanceof Promise) && !(out instanceof RegExp)) out = JSON.stringify(out, null, '  ')
			} catch (e) { out = e }
			out = out
				.toString()
				.replaceAll(c.token, '[CENSORED]')
			if (out.length >= 2000) out = out.slice(0, 1962) + `\n...${out.length - 1962} characters left`
			msg.channel.send("```js\n" + out.toString() + '```')
		}
		if(args[2] == 'stop' && args[1] == 'dev') {
			if(args[3] == 'confirm') {
				c.destroy(process.env['tk'])
			} else {msg.channel.send('Are you sure to stop the bot? THIS WILL IMMEDIATELY STOP THE BOT AND THE NODE.JS PROCESS!\nDo \`rx dev stop confirm\` to stop the bot.')}
		}
		if(args[2] == 'restart' && args[1] == 'dev') {
			msg.channel.send('Restarting bot...')
			require('./rsAssist')
		}
		if(args[2] == 'crash' && args[1] == 'dev') {
			msg.channel.send('Crashing bot...')
			throw new Error('crashcall')
		}
	}
})

create('help', (msg) => {
	msg.channel.send(`RyzanX is a collection of features built based on RBot core that have been simplified and optimized.
Support us: https://replit.com/join/ldywgjxbeq-henry133
Thanks for using!

Prefix: \`rx <cmd_lowercase>\`

rx hi: Hello!
rx dev: Developer Corner help page.
rx help: This page
rx repeat: Repeat your message
rx say: Repeat your message and delete the original message
`)
})

create('repeat', (msg, args) => {
	const args = msg.content.split(' ').slice(2).join(' ')
	msg.channel.send(args)
})

create('say', (msg) => {
	const args = msg.content.split(' ').slice(2).join(' ')
	msg.delete()
	msg.channel.send(args)
})

process.on('beforeExit', () => {c.destroy(process.env.tk)})

module.exports = {
	client: c
}