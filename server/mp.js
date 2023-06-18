const express = require('express')
const http = require('http')
const srv = express()

srv.use(express.static(process.cwd() + '/server/web/'))

srv.get('/', (req, res, next) => {
	res.set('Content-Type', 'text/html');
	res.status(200).send(`RyzanX is a Discord Bot that built based on RBot core which have been simplified by Henry133<br>
<a href="https://discord.com/api/oauth2/authorize?client_id=1107664127289212978&permissions=10430262541431&scope=bot%20applications.commands">Invite</a><br>\n
Thanks\n`)
	next()
})

http.createServer(srv).listen(80)