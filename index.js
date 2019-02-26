const express = require('express');
const app = express();
var events = require('events').EventEmitter
var emitter = new events.EventEmitter()
const DoughChef = require('./entities/doughChef').DoughChef
const ToppingChef = require('./entities/toppingChef').ToppingChef
const Oven = require('./entities/oven').Oven
const Pizza = require('./entities/pizza').Pizza
const  piz = require('./entities/pizza')
const Waiters = require('./entities/waiters').Waiters
const pizzaService = require('./services/pizzaService')
const logger = require('./config/winston').logger

const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`The application is listenning on port ${port}`))


function handlePizza(pizza){
    // do something 
  }
  
  async function getNewPizza(pizza){
    await emitter.on('newPizza', handlePizza);
  }
  
  //emitter.removeListener('newPizza', handlePizza);

// Create resturant team
const doughChef1 = new DoughChef("dough chef 1")
const doughChef2 = new DoughChef("dough chef 2")
const toppingChef1 = new ToppingChef("Topping chef 1")
const oven = new Oven()
const waiters1 = new Waiters("waiters 1")
const waiters2 = new Waiters("waiters 1")

// Input pizza orders
const pizzaArr = pizzaService.createPizzaList()

emitter.on('dough',async function(pizza) {
    doughChef1.doWork
    const startTime = Date.now()
    piz.setDoughStartTime(pizza, startTime)
    logger.debug(`The pizza ${pizza.name} is starting process by the doughchef, startTime = ${startTime}`)
    setTimeout(()=> {
        const endTime = Date.now()
        logger.debug(`The pizza ${pizza.name} dough was finished by the doughchef, endTime = ${endTime}`)
        piz.setDoughEndTime(pizza, endTime)
     //   emitter.removeListener('dough', pizza)
        emitter.emit('toppings', pizza) 
    }, 7000)
})

emitter.on('toppings', function(pizza) {
    const startTime = Date.now()
    logger.debug(`The pizza ${pizza.name} is starting process by the topping chef, startTime = ${startTime}`)
    piz.setToppingStartTime(pizza, startTime)
    setTimeout(() => {
        const endTime = Date.now()
        logger.debug(`The pizza ${pizza.name} was finished by the topping chef, endTime = ${endTime}`)
        piz.setToppingEndTime(pizza, endTime)
       // emitter.removeListener('toppings', pizza)
        emitter.emit('oven', pizza)
    }, 4000)
})

emitter.on('oven', function(pizza) {
    const startTime = Date.now()
    logger.debug(`The pizza ${pizza.name} is starting process in the oven, startTime = ${startTime}`)
    piz.setOvenStartTime(pizza, startTime)
    setTimeout(()=> {
        const endTime = Date.now()
        logger.debug(`The pizza ${pizza.name} was finished its process in the oven, endTime = ${endTime}`)
        pizza.status = "OVEN"
        piz.setOvenEndTime(pizza, endTime)
       // emitter.removeListener('oven', pizza)
        emitter.emit('waiters', pizza) 
    }, 10000)
})

emitter.on('waiters', function(pizza) {
    const startTime = Date.now()
    logger.debug(`The pizza ${pizza.name} is being served by the waiters, startTime = ${startTime}`)
    piz.setWaitressStartTime(pizza, Date.now())
    setTimeout(() => {
        const endTime = Date.now()
        logger.debug(`The pizza ${pizza.name} was served by the waiters and the customer is happy, endTime = ${endTime}`)
        pizza.status = "WAITERS"
        piz.setWaitressEndTime(pizza, endTime)
       // emitter.removeListener('waiters', pizza)
        logger.debug(`Finished pizza name : ${pizza.name}, the pizza object is: ` + JSON.stringify(pizza))  
        const orderTime = pizzaService.calculatePizzaOrderTime(pizza)
        logger.debug(`========== ${pizza.name} order time is: ${orderTime} ==========`)
    }, 5000)
})

pizzaArr.forEach( (pizza)=> {
    emitter.emit('dough', pizza)    
})

