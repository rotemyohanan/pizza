# Pizza Restaurant

This is the core code for the pizza exercise.


### Getting started

In order to run the project please run the following command:
```javascript
node index.js
```


### Description
The solution is based on the events module, as the pizza process is event deriven (the pizza status trigger the next process should be done)

There events solution is a more Node.js code style to implements the well known observer design pattern in OOP.
Each pizza order is emitted to the listeners, while each part of the process is listening to the pizza status.


The pizza object should look like as follows:
```javascript
{ "name":"pizza 1",
  "status":"SERVED", // status can be: "PENDING", "DOUGH", "TOPPING", "OVEN", "SERVED"
  "doughTime":[1551223330558,1551223337562],  // the left value is the starting time, the right value is the ending time
  "toppingTime":[1551223337563,1551223341564],// the left value is the starting time, the right value is the ending time
  "ovenTime":[1551223341564,1551223351566],   // the left value is the starting time, the right value is the ending time
  "waitersTime":[1551223351567,1551223356570]// the left value is the starting time, the right value is the ending time
  }
```

From the definitions of the exercise there should be: 
2 doughChefs
3 toppingChefs
1 Oven
2 waiters

### Deployment
TBD


