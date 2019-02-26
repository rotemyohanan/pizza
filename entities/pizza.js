
class Pizza {

    constructor(name) {
        this.name = name
        this.status = 'PENDING'
        this.doughTime = ['','']
        this.toppingTime = ['','']
        this.ovenTime = ['','']
        this.waitressTime = ['','']
        console.log(this)
    }

}

function setDoughStartTime(pizza, time) {
    pizza.doughTime[0] = time
}

function setDoughEndTime(pizza, time) {
    pizza.doughTime[1] = time
}

function setToppingStartTime(pizza, time) {
    pizza.toppingTime[0] = time
}

function setToppingEndTime(pizza, time) {
    pizza.toppingTime[1] = time
}

function setOvenStartTime(pizza, time) {
    pizza.ovenTime[0] = time
}

function setOvenEndTime(pizza, time) {
    pizza.ovenTime[1] = time
}

function setWaitressStartTime(pizza, time) {
    pizza.waitressTime[0] = time
}
function setWaitressEndTime(pizza, time) {
    pizza.waitressTime[1] = time
}

function getOrderTime() {
    return this.waitressTime[1] - this.doughTime[0] 
}

module.exports = {Pizza, setDoughStartTime, setDoughEndTime, setToppingEndTime, setToppingStartTime, setOvenStartTime, setOvenEndTime, setWaitressStartTime, setWaitressEndTime, getOrderTime}
