var events = require('events').EventEmitter
var emitter = new events.EventEmitter()
const DoughChef = require('./entities/doughChef').DoughChef
const ToppingChef = require('./entities/toppingChef').ToppingChef
const Oven = require('./entities/oven').Oven
const Pizza = require('./entities/pizza').Pizza
const  piz = require('./entities/pizza')
const Waitress = require('./entities/waitress').Waitress
const pizzaService = require('./services/pizzaService')

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
    
    console.log(`The pizza ${pizza.name} is in the doughchef`)
    piz.setDoughStartTime(pizza, Date.now())
    setTimeout(()=> {
        piz.setDoughEndTime(pizza, Date.now())
        emitter.emit('toppings', pizza) 
        console.log(pizza)
    }, 2000)
    /* console.log(`the pizza ${pizza} is in the dough chef` )//+ doughChef.name)
    setTimeout(() => {
        emitter.emit('toppings', pizza) 
        doughlock.release()
    }, 7000) */
    
})

emitter.on('toppings', function(pizza) {
    
    console.log("the pizza is in the topping chef")
    piz.setToppingStartTime(pizza, Date.now())
    setTimeout(() => {
        piz.setToppingEndTime(pizza, Date.now())
        emitter.emit('oven', pizza)
        
    }, 2000)
    
})

emitter.on('oven', function(pizza) {
    //oven.update(pizza)
    console.log("The pizza is in the oven")
    piz.setOvenStartTime(pizza, Date.now())
    setTimeout(()=> {
        pizza.status = "OVEN"
        piz.setOvenEndTime(pizza, Date.now())
        emitter.emit('isServed', pizza) 
        //this.lock.release()
    }, 1000)
})

emitter.on('isServed', function(pizza) {
    
    console.log("the pizza is being served")
    piz.setWaitressStartTime(pizza, Date.now())
    setTimeout(() => {
        piz.setWaitressEndTime(pizza, Date.now())
        console.log("The pizza is on the table of a happy customer")  
        console.log(`Finished pizza name : ${pizza.name}, the pizza object is: ` + JSON.stringify(pizza))  
        const orderTime = pizzaService.calculatePizzaOrderTime()
        console.log(`============ The pizza order time is: ${orderTime} ===============`)
    }, 1000)
    
})

emitter.emit('dough', pizzaArr[0])
