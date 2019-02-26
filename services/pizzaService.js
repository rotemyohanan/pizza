const Pizza = require('../entities/pizza').Pizza

function createPizzaList() {    
    const pizza1 = new Pizza("pizza 1")
    const pizza2 = new Pizza("pizza 2")
    const pizza3 = new Pizza("pizza 3")
    const pizzaArr = [pizza1, pizza2, pizza3]
    return pizzaArr
}

function calculatePizzaOrderTime(pizza) {
    const diffTime =  (pizza.waitressTime[1] - pizza.doughTime[0]) /1000
    return `${diffTime} [sec]`
}

module.exports = {createPizzaList, calculatePizzaOrderTime}
