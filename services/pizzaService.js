const Pizza = require('../classes/pizza').Pizza

function createPizzaList() {    
    const pizza1 = new Pizza("pizza 1")
    const pizza2 = new Pizza("pizza 2")
    const pizza3 = new Pizza("pizza 3")
    const pizzaArr = [pizza1, pizza2, pizza3]
    return pizzaArr
}

function calculatePizzaOrderTime(pizza) {
    return pizza.waitressTime[1] - pizza.doughTime[0]
}

module.exports = {createPizzaList, calculatePizzaOrderTime}
