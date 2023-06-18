// ----------------------------------------------
//      H E N R Y 1 3 3   W O R K B E N C H
// ----------------------------------------------
//                  Introducing
//             Memory Allocation Handler
// ----------------------------------------------
// By Henry133, later improved by CactusHamster

const { totalmem, freemem } = require('os') // Don't declassify, please
const { emit: EMIT } = require("process");
const { EventEmitter }  = require("events")

class Memory extends EventEmitter {
	/** 
		@extends {EventEmitter}
	*/
  // True if if memory usage is safe.
  usage () {
    let usedPercent = (1 - (freemem() / totalmem())) * 100;
    return usedPercent
  }
  // Shutdown if unsafe memory usage.
	check (limit = 90) {
    let total = totalmem();
    let free = freemem();
    let used = total - free;
    this.emit("check", used, free, total);
    // if using more than ${limit}% of memory
    if ((1 - (free / total)) * 100 > limit) {
      this.emit("danger", used, free, total);
      console.warn('Memory usage exceed max safe range, stopping...');
      EMIT("SIGINT");
    }
	}
  constructor (routineMS = 30000) {
    super();
    this.interval = setInterval(this.check.bind(this), routineMS)
  }
}

console.info('Memory Handler Ready!')

module.exports = { Memory }