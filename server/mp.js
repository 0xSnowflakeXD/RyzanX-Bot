const express = require('express')
const srv = express()

srv.get('/', (req, res, next) => {
	res.set('Content-Type', 'text/html');
	res.status(200).send(`RyzanX is a Discord Bot that built based on RBot core which have been simplified by Henry133<br>
<a href="https://discord.com/api/oauth2/authorize?client_id=1107664127289212978&permissions=10430262541431&scope=bot%20applications.commands">Invite</a><br>\n
Thanks\n`)
	next()
})

srv.post('/', (req, res, next) => {
	console.log(req)
})

const apiGET = []
const apiPOST = []

async function createGET(name, handler) {
	apiGET.push({name, handler: function(req, res) {res.send('APINAME ' + name + "UNRESPONSIVE")}, date:new Date(),ts:Date.now()})
}

async function createPOST(name, handler) {
	apiPOST.push({name, handler: function(req, res) {res.send('APINAME ' + name + "UNRESPONSIVE")}, date:new Date(),ts:Date.now()})
}

apiGET.forEach(a => {
	srv.get('/api/' + a.name, (req, res) => {
		a.handler(req, res)
	})
})

apiPOST.forEach(a => {
	srv.post('/api/' + a.name, (req, res) => {
		a.handler(req, res)
	})
})

srv.listen(443)