console.clear()

const lginStart = new Date().getTime()

const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, Intents } = require('discord.js')
const { promisify } = require('util')
const { EventEmitter } = require('events')
const requiredir = require('require-dir')
const color = require('colors')
const os = require('os')
const request = require('request')
const path = require('path')
const fs = require('fs')
// Handlers
const { Memory } = require('./handler/memhandler')
// const ch = require('./handler/cpuhandler')
// Handlers End

requiredir('./server')

const memChecker = new Memory(30 * 1000);
memChecker.on('danger', (used, free, total) => console.warn(`-- MEMORY USAGE CAUTION --
Caught on: ${Date()}
Details: Memory use exceeded Repl's limit

Memory Usage: ${used}
Total Repl Memory: ${total}
Memory left: ${free}
-- END --`))

const exthandler = new EventEmitter()

function alive(yourURL) {
	request.post(
		yourURL,
		{ json: { head: 'TModeration Aliver', body: 'KeepAlive Data' } },
		function(error, response) {
			if (!error && response.statusCode == 200) {
				return true
			}
		}
	)
}

let alive1 = () => alive("https://ryzanx.henry133.repl.co")

setInterval(alive1,5000)

// Cheating exceptions

process.on('uncaughtException', (e) => {
	console.log(e)
	require('./rsAssist.js')
})

const command = []
const slashCommand = []
const devs = ['1010354519495954452', '238859849641754636', '927563409409581066', '752617663888359444', '762771482434600992', '810221998881898507']
const bl = [
  "229921633199063040",
  "1096760755174526987"
]

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
		GatewayIntentBits.GuildPresences
	]
})

c.login(process.env['tk'])

c.on('ready', () => {
	// ----
	globalThis.lginEnd = new Date().getTime()
	// ----
	c.user.setActivity({name: `${c.guilds.cache.size} guilds | RyzanX's Lightray Photons`, type: ActivityType.Watching})
	process.stdout.write(`${color.blue(c.user.tag)} ${color.brightGreen('is ready!')}\n`)
	async function tokenclear() {c.token = ""}
	tokenclear().then(_ => {process.stdout.write('Clear token!' + '\n')})
});

async function create(handler, cb) {
	command.push({cn:handler, cb:cb, ID: Math.floor(Math.random() * Math.floor(Math.random() * 50) * 100), ts: Date.now()})
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

c.on('messageCreate', async msg => {
	const args = msg.content.split(' ')
	let prefix = 'rx'
// 	if(msg.content === '<@1107664127289212978>' || '<@!1107664127289212978>' && !args[1] && msg.author.bot === false) {
// 		msg.channel.send(`RyzanX is a collection of experimental in-dev features built based on RBot core idea. The official alternative solution of TModeration Bot
// Thanks for using!

// Prefix: \`rx <cmd_lowercase>\`

// rx hi: Hello! You can also place member name/mention, for example: \`rx hi Henry133 -> Hello, Henry133\`; \`rx hi @Henry133 -> Hello, @Henry133\`
// rx dev: Developer Corner help page & subcommands
// rx help: This page
// rx repeat: Repeat your message
// rx say: Repeat your message and delete the original message
// rx internationale: Comrade time! Sing The Internationale toghether with your friends, and have fun!
// rx update: Development updates
// `)
// 		return false;
// 	}
	if(!msg.content.toLowerCase().startsWith(prefix)) return false;
	if(msg.author.bot === true) return false;
	if(bl.includes(msg.author.id)) {
		msg.channel.sendTyping()
		sleep(200)
		msg.channel.send('Sorry, but you have been hard-coded to RyzanX blacklist. You can\'t use the bot.')
		msg.channel.send('If you believe this is an error, please report to Henry133#2436')
		return false;
	};
	command.forEach(c => {
		const args = msg.content.split(' ')
		// let prefix = 'rx'
		// if(!msg.content.startsWith(prefix)) return false;
		// if(msg.author.bot === true) return false;
		// if(bl.includes(msg.author.id)) {
		// 	msg.channel.send('Sorry, but you have been hard-coded to RyzanX blacklist. You can\'t use the bot.')
		// 	msg.channel.send('If you believe this is an error, please report to Henry133#2436')
		// 	return false;
		// };

		if(args[1].toLowerCase() == c.cn.toLowerCase() && c.cb instanceof Function) {
			c.cb(msg, args)
		}
	})
})

// ANTI BOT
// c.on('guildMemberAdd', (member) => {
// 	const date = Date.now()
//   c.emit('mjoin', date, member)
// })

// c.on('mjoin', (a, d) => {
// 	const b = Date.now()
// 	let c = b - a

// 	if(c <= 250) {
// 		d.guild.ban(d.id.toString())
// 	}
// })
// ANTI BOT END

create('hi', (msg, args) => {
	if(!!args[2]) {
		msg.channel.sendTyping()
		sleep(100)
		msg.channel.send('Hello, ' + args[2])
		return false;
	}
	msg.channel.sendTyping()
	sleep(100)
	msg.channel.send('Hello!')
})

create('dev', (msg, args) => {
	if(!args[2]) {
		msg.channel.send(`**Developer Corner**
These commands is designed for our Developers.

rx dev analysis: Return useful bot info for investigating.
rx dev guilds: Return list of guilds in format: \`Name: \${g.name} | ID: \${g.id})\`.
rx dev users: Return cached users (for investigating purposes).
rx dev devs: Return developers in their IDs and name (If they are cached or reaching them is possible).
rx dev eval: Execute code.
rx dev stop: Stop the bot.
rx dev restart: Restart the bot.
rx dev crash: Crash the bot to see if it is restarting.
rx dev add: Add a developer to temporatily memory.
rx dev rem: Remove a developer from temporatily memory.
rx dev sendfile: Send a file in \`/res/\`.
`)
	} else {
		if(!devs.includes(msg.author.id)) {msg.channel.send('YOU ARE NOT PERMITTED TO PEFORM THIS ACTION'); return false}
		if(args[2] == 'analysis' && args[1] == 'dev') {
			console.log(`-- Bot Trace Data --
Load Time:
  |- Login + Code Reading    : ${globalThis.lginEnd - lginStart}
  \\-
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
			msg.channel.sendTyping()
			sleep(100)
			msg.channel.send('Sucessful logged bot data to Console.')
		}
		if(args[2] == 'add' && args[1] == 'dev') {
			devs.push(msg.mentions.users.first().id)
		}
		if(args[2] == 'rem' && args[1] == 'dev') {
			devs.forEach(d => {if(msg.mentions.users.first().id) {d = null}})
		}
		if(args[2] == 'guilds' && args[1] == 'dev') {
			msg.channel.sendTyping()
			sleep(100)
			c.guilds.cache.forEach(g => msg.channel.send(`Name: ${g.name} | ID: ${g.id}`))
		}
		if(args[2] == 'users' && args[1] == 'dev') {
			msg.channel.sendTyping()
			sleep(100)
			const mapper = c.users.cache.map(u => {
        return (u.bot) ? `` : `${u.discriminator == 0 ? u.username : u.tag} | ${u.id}\n`
			})
			let join = mapper.join('')
			if (join.length >= 2000) join = join.slice(0, 1965) + `\n...${join.length - 1965} characters left`
			msg.channel.send(join)
		}
		if(args[2] == 'devs' && args[1] == 'dev') {
			msg.channel.sendTyping()
			sleep(100)
			devs.forEach(d => msg.channel.send(d))
		}
		// if(args[2] == 'sendfile' && args[1] == 'dev') {
		// 	if(!args[3]) {msg.channel.send('File sender. Provide file name in args [4] to send available file in `/res/`'); return false}
		// 	if(!fs.existsSync(path.resolve(path.join(process.cwd(), './res/' + args[3])))) {msg.channel.send('File does NOT exists. Abort!'); return false}
		// 	msg.channel.sendTyping()
		// 	sleep(100)
		// 	msg.channel.send({content: args[3], files: [path.resolve(path.join(process.cwd(), './res/' + args[3]))]})
		// }
		if(args[2] == 'eval' && args[1] == 'dev') {
			if(!devs.includes(msg.author.id)) {msg.channel.sendTyping(); msg.channel.send('YOU ARE NOT PERMITTED TO PEFORM THIS ACTION'); return false}
			let out;
			try {
				let code = msg.content.split(' ').slice(3).join(" ")
				out = eval(code) // Eval the splitted code
				if (out.toString() == '') out = '[Empty Code Input]'
				if(out.toString() == 'undefined' || !out.toString()) {
					out = 'undefined'
				}
				if (out instanceof Object && !(out instanceof Promise) && !(out instanceof RegExp)) out = JSON.stringify(out, null, '  ')
			} catch (e) { out = e.message }
			out = out // out.split('').map(char => {
			// 	let notoken = c.token.split('').map(c => {
			// 		if(char === c) {return false;} else {return c}
			// 	})
			// 	return notoken.join('')
			// }).join('')
			if (out.length >= 2000) out = out.slice(0, 1965) + `\n...${out.length - 1965} characters left`
			msg.channel.send("```js\n" + out.toString() + '```')
		}
		if(args[2] == 'stop' && args[1] == 'dev') {
			if(args[3] == 'confirm') {
				async function cdest() {c.destroy(process.env['tk'])}
				cdest().then(_ => {process.exit(0)})
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
		if(args[2] == 'cinfo' && args[1] == 'dev') {
			if(!args[3]) {
				msg.channel.send('Command ID & list:')
				command.forEach(c => {
					msg.channel.send(`ID: ${c['ID']}\nName: ${c.cn}`)
				})
				msg.channel.send('Provide a command ID in next argument to get details and info about the command.')
				return false;
			}
			command.forEach(c => {
				if(parseInt(args[3]) === parseInt(c['ID'])) {
					msg.channel.send(`\`${c.cn}\` command info\n- Command ID: ${c['ID']}\n- Command Name: ${c.cn}\n- Command Registered Timestamp: ${c.ts}\n- Command callback:\n\`\`\`js\n${c.cb.toString()}\n\`\`\``)
				}
			})
		}
	}
})

create('help', (msg) => {
	msg.channel.send(`RyzanX is a collection of experimental in-dev features built based on RBot core idea.
Thanks for using!

Prefix: \`rx <cmd_lowercase>\`

rx hi: Hello! You can also place member name/mention, for example: \`rx hi Henry133 -> Hello, Henry133\`; \`rx hi @Henry133 -> Hello, @Henry133\`
rx dev: Developer Corner help page & subcommands
rx help: This page
rx repeat: Repeat your message
rx say: Repeat your message and delete the original message
rx internationale: Comrade time! Sing The Internationale toghether with your friends, and have fun!
rx update: Development updates
rx sendfile: Send some file
rx listfile: List available files to send
rx bot-security-leak-preview: Henry133 tried to leak his security hole for LIMITED time. USE THIS CODE WITH INSTRUCTION TO DESTROY THE BOT!
rx ban: (Permanently) Ban users for specific reason. Usage: \`rx ban @user reason\` (MENTION ONLY)
rx kick: Kick users for specific reason. Usage: \`rx kick @user reason\` (MENTION ONLY)
rx timeout: Timeout members. Usage: \`rx timeout @user duration_in_minutes reason\`
`)
})

create('repeat', (msg) => {
	const args = msg.content.split(' ').slice(2).join(' ')
	if(!args) {msg.channel.send('Well, say something in next argument, please?'); return false}
	msg.channel.send(args)
})

create('say', (msg) => {
	const args = msg.content.split(' ').slice(2).join(' ')
	if(!args) {msg.channel.send('Well, say something in next argument, please?'); return false}
	msg.delete()
	sleep(100)
	msg.channel.sendTyping()
	sleep(100)
	msg.channel.send(args)
})

create('internationale', (msg) => {
	msg.channel.sendTyping()
	sleep(100)
	msg.reply({content:'This is L\'Internationale song (instrumental). Sing with your friends, server members, and have a great moment!', files: [path.resolve(path.join(process.cwd(), './res/the-intern~.mp3'))]})
})

create('sendfile', (msg, args) => {
	const filename = msg.content.split(' ').slice(2).join(' ')
	if(!filename || filename === '') {
		msg.channel.sendTyping()
		sleep(200)
		msg.channel.send('File sender. Provide file name to send available file in `/res/` (do `rx listfile`)'); return false
	}
	if(!fs.existsSync(path.resolve(path.join(process.cwd(), './res/' + filename))) || filename.startsWith('../') || filename.startsWith('./') || filename.includes('index.js') || filename.startsWith('~/') || filename.startsWith('.') || filename.startsWith('$') || filename.includes('/../') || filename.includes('/.../') || filename.includes('./') || filename.includes('/.'))) {
		msg.channel.sendTyping()
		sleep(200)
		msg.channel.send('File does NOT exists. Abort!'); return false
	}
	msg.channel.sendTyping()
	sleep(100)
	msg.channel.send({content: filename, files: [path.resolve('./res/' + filename)]})
})

create('listfile', (msg) => {
	let dir = fs.readdirSync(path.resolve(path.join(process.cwd(), './res/')))
	dir.forEach(file => {
		msg.channel.sendTyping()
		sleep(100)
		msg.channel.send(file)
	})
})

create('updates', (msg) => {
	msg.channel.sendTyping()
	// msg.reply('Update 1.9089.16\nAdded local file sender `rx dev sendfile`. Seek `rx dev` for more details and usage.')
	sleep(100)
	msg.reply('Migrated since 1.9089.16b. Use `rx update`')
})

create('update', (msg) => {
	msg.channel.sendTyping()
	sleep(100)
	msg.reply('Update 1.9670.20\n- Few tweaks')
})

create('bot-security-leak-preview', (msg) => {
	msg.channel.send({content: 'Here is the developer passcode. Contact `henry133.dev` to get access to our limited API. And then, use the passcode to continue breaking the bot. Enjoy!', files: [path.resolve(path.join(process.cwd(), './res/developer-passcode.mp3'))]})
})

create('ban', (msg) => {
	msg.channel.sendTyping()
	const target = msg.mentions.users.first().id
	const reason = msg.content.split(' ').slice(3).join(' ')
	msg.guild.bans.create(target, {reason: (reason.toString() ? reason.toString() : '')})
		.then(_ => {
			msg.channel.send(`User <@${target}> has been banned by <@${msg.author.id}>. Reason: ${reason.toString() ? reason.toString() : 'no reason provided.'}`)
			msg.guild.members.resolve(target).send(`You have been banned by <@${msg.author.id}>, because of ${reason.toString() ? reason.toString() : '(no reason provided.)'}`)
		})
		.catch(e => {
			msg.channel.send(`I dont have enough permissions for that.\nPerformed action: Ban <@${target}> for ${reason.toString() ? reason.toString() : '(no reason provided)'}`)
		})
})

create('kick', (msg) => {
	msg.channel.sendTyping()
	const target = msg.guild.members.resolve(msg.mentions.users.first().id)
	const reason = msg.content.split(' ').slice(3).join(' ')
	target.kick(reason.toString() ? reason.toString() : '')
		.then(_ => {
			msg.channel.send(`User <@${target.user.id}> has been kicked by <@${msg.author.id}>. Reason: ${reason.toString() ? reason.toString() : 'no reason provided.'}`)
			target.send(`You have been kicked by <@${msg.author.id}>, because of ${reason.toString() ? reason.toString() : '(no reason provided.)'}`)
		})
		.catch(e => {
			msg.channel.send(`I dont have enough permissions for that.\nPerformed action: Kick <@${target}> for ${reason.toString() ? reason.toString() : '(no reason provided)'}`)
		})
})

create('timeout', (msg) => {
	msg.channel.sendTyping()
	const target = msg.guild.members.resolve(msg.mentions.users.first().id)
	const time = parseInt(msg.content.split(' ')[2]) * 1000 * 60
	const reason = msg.content.split(' ').slice(4).join(' ')
	target.timeout(time ? time : 5 * 1000 * 60, reason.toString() ? reason.toString() : '')
		.then(_ => {
			msg.channel.send(`User <@${target.user.id}> has been timed-out by <@${msg.author.id}>. Reason: ${reason.toString() ? reason.toString() : 'no reason provided.'} for ${time ? time : 5}m`)
			target.send(`You have been timed-out by <@${msg.author.id}>, because of ${reason.toString() ? reason.toString() : '(no reason provided.)'} for ${time ? time : 5}m`)
		})
		.catch(e => {
			msg.channel.send(`I dont have enough permissions for that.\nPerformed action: Timeout <@${target}> for ${reason.toString() ? reason.toString() : '(no reason provided)'} for ${time ? time : 5}m`)
		})
})

process.on('beforeExit', () => {require(path.resolve(path.join(process.cwd(), './rsAssist.js')))})
process.on('exit', () => {require(path.resolve(path.join(process.cwd(), './rsAssist.js')))})
process.on('SIGINT', () => {require(path.resolve(path.join(process.cwd(), './rsAssist.js')))})
process.on('SIGTERM', () => {require(path.resolve(path.join(process.cwd(), './rsAssist.js')))})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
	const childp = require('child_process')
	async function exiterr() {process.exit(-1)}

	exiterr().then(_ => {child_process.spawn('node', './rsAssist.js')})
});

process.on('uncaughtException', (error) => {
  console.log('Error: ' + error)
	const childp = require('child_process')
	async function exiterr() {process.exit(-1)}

	exiterr().then(_ => {child_process.spawn('node', './rsAssist.js')})
});
// process.on('SIGKILL', () => {require(path.resolve(path.join(process.cwd(), './rsAssist.js')))})


module.exports = {
	client: c
}