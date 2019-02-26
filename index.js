const express = require('express');
const app = express();
var events = require('events').EventEmitter
var emitter = new events.EventEmitter()
const DoughChef = require('./entities/doughChef').DoughChef
const ToppingChef = require('./entities/toppingChef').ToppingChef
const Oven = require('./entities/oven').Oven
const Pizza = require('./entities/pizza').Pizza
const  piz = require('./entities/pizza')
const Waitress = require('./entities/waitress').Waitress
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
  
  emitter.removeListener('newPizza', handlePizza);


//const doughlock = new Lock()

// Create resturant team
const doughChef1 = new DoughChef("dough chef 1")
const doughChef2 = new DoughChef("dough chef 2")
const toppingChef1 = new ToppingChef("Topping chef 1")
const oven = new Oven()
const waitress1 = new Waitress("waitress 1")

// Input pizza orders
const pizzaArr = pizzaService.createPizzaList()



/* pizzaArr.forEach( async (pizza) => {
    
    const p1 = await doughChef1.update(pizza)
    p1.then(await toppingChef1.update(pizza))
    p1.then(await oven.update(pizza))
    p1.then(await waitress1.update(pizza))
})
*/
/* emitter.on('pending', ()=> {
    this.lock.acquire()
    console.log(`The pizza ${pizza.name} is in the doughchef`)
    console.log('Dough chef lock acquired for' + this.name)
    setTimeout(()=> {
        pizza.setStatus("DoughChef")
        emitter.emit('toppings', pizza) 
         this.lock.release()
    }, 2000)
})
 */
emitter.on('dough',async function(pizza) {
    //await doughlock.acquire()    
    //doughChef1.update(pizza)

    const startTime = Date.now()
    piz.setDoughStartTime(pizza, startTime)
    logger.debug(`The pizza ${pizza.name} is starting process by the doughchef, startTime = ${startTime}`)
    setTimeout(()=> {
        const endTime = Date.now()
        logger.debug(`The pizza ${pizza.name} dough was finished by the doughchef, endTime = ${endTime}`)
        piz.setDoughEndTime(pizza, endTime)
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
        emitter.emit('isServed', pizza) 
    }, 10000)
})

emitter.on('isServed', function(pizza) {
    const startTime = Date.now()
    logger.debug(`The pizza ${pizza.name} is being served by the waitress, startTime = ${startTime}`)
    piz.setWaitressStartTime(pizza, Date.now())
    setTimeout(() => {
        const endTime = Date.now()
        logger.debug(`The pizza ${pizza.name} was served by the waitress and the customer is happy, endTime = ${endTime}`)
        pizza.status = "SERVED"
        piz.setWaitressEndTime(pizza, endTime)
        logger.debug(`Finished pizza name : ${pizza.name}, the pizza object is: ` + JSON.stringify(pizza))  
        const orderTime = pizzaService.calculatePizzaOrderTime(pizza)
        logger.debug(`========== ${pizza.name} order time is: ${orderTime} ==========`)
    }, 5000)
    
})

pizzaArr.forEach( (pizza)=> {
    emitter.emit('dough', pizza)    
})

