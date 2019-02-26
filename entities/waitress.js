const Lock = require('../lock').Lock
var events = require('events').EventEmitter
var emitter = new events.EventEmitter()

class Waitress {

    constructor(name) {
        this.name = name
        this.lock = new Lock()
        console.log('created new waitress chef ' + name)
    }

    update(pizza) {
        this.lock.acquire()
        console.log(`The pizza ${pizza.name} is served by the waitress`)
        console.log('Waitress lock acquired for' + this.name)
        setTimeout(()=> {
            pizza.setStatus("Waitress")
            this.lock.release()
        }, 5000)
    }
}

module.exports = {Waitress}