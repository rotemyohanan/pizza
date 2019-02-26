const Lock = require('./lock').Lock
const pizza = require('./pizza')
var events = require('events').EventEmitter
var doughChefEmitter = new events.EventEmitter()

class DoughChef {

    constructor(name) {
        this.name = name
        this.lock = new Lock()
        console.log('created new Dough chef ' + name)
        doughChefEmitter.on('dough', this.doWork)
    }

    doWork() {
        pizza.setDoughStartTime(Date.now())
        setTimeout(()=> {
            pizza.setStatus("DoughChef")
            pizza.setDoughEndTime(Date.now())
            emitter.emit('toppings', pizza) 
            //this.lock.release()
        }, 7000)
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