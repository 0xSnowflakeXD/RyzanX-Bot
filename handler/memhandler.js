// ----------------------------------------------
//      H E N R Y 1 3 3   W O R K B E N C H
// ----------------------------------------------
//                  Introducing
//             Memory Allocation Handler
// ----------------------------------------------
// Copyright (c) by James Henry. All rights reserved.
// One of Advanced Coding Project.

const os = require('os')

class Memory {
	constructor() {
		this.totalmem = os.totalmem()
		this.freemem = os.freemem()
		this.usedmem = this.totalmem - this.freemem
	}
	check(maxsafe, fallback_cb) {
		if(this.usedmem > maxsafe) {
			function errwarn() {
				console.warn('Memory usage exceed max safe range, stopping...')
				process.exit(0x2)
				return 0xfb
			}
			
			(!!fallback_cb) ? fallback_cb(this?.totalmem, this?.freemem, this?.usedmem) : errwarn()
			return -1
		}
	}
}

console.info('Memory Handler Ready!')

module.exports = {
	Memory: Memory
}