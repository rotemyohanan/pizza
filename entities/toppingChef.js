const Lock = require('./lock').Lock
var events = require('events').EventEmitter
var emitter = new events.EventEmitter()

class ToppingChef {

    constructor(name) {
        this.name = name
       this.lock = new Lock()
        console.log('created new Topping chef ' + name)
    }

    update(pizza) {
       this.lock.acquire()
        console.log(`The pizza ${pizza.name} is in the Topping Chef`)
        console.log('Topping chef lock acquired for' + this.name)
        setTimeout(()=> {
            pizza.setStatus("Topping Chef")
            emitter.emit('Toppings', pizza) 
            this.lock.release()
        }, 2000)
    }
}

module.exports = {ToppingChef}