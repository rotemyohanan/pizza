const Lock = require('../lock').Lock
var events = require('events').EventEmitter
var emitter = new events.EventEmitter()

class DoughChef {

    constructor(name) {
        this.name = name
        this.lock = new Lock()
        console.log('created new Dough chef ' + name)
    }

    async update(pizza) {
        this.lock.acquire()
        console.log(`The pizza ${pizza.name} is in the doughchef`)
        console.log('Dough chef lock acquired for' + this.name)
        setTimeout(()=> {
            pizza.setStatus("DoughChef")
            emitter.emit('Toppings', pizza) 
            this.lock.release()
        }, 7000)
    }
}

module.exports = {DoughChef}