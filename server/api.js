const { client } = require('../index.js')

const express = require('express')
const srv = express()

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