const Lock = require('../lock').Lock
var events = require('events').EventEmitter
var emitter = new events.EventEmitter()

class Oven {

    constructor(name) {
        this.name = name
        this.lock = new Lock()
    }

    update(pizza) {
        this.lock.acquire()
        console.log("The pizza is in the oven")
        setTimeout(()=> {
            pizza.status = "OVEN"
            emitter.emit('isServed', pizza) 
            this.lock.release()
        }, 5000)
        
    }
}

module.exports = {Oven}
