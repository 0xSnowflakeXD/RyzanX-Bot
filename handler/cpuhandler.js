const os = require('os')

class CPU {
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
	CPUMan: CPU
}