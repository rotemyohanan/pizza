const Lock = require('./lock').Lock
var events = require('events').EventEmitter
var emitter = new events.EventEmitter()

class Waiters {

    constructor(name) {
        this.name = name
        this.lock = new Lock()
        console.log('created new waiters with name: ' + name)
    }

    update(pizza) {
        this.lock.acquire()
        console.log(`The pizza ${pizza.name} is served by the waiters`)
        console.log('Waitress lock acquired for' + this.name)
        setTimeout(()=> {
            pizza.setStatus("Waiters")
            this.lock.release()
        }, 5000)
    }
}

module.exports = {Waiters}