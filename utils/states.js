const statesUS = require('./json/states_hash.json');
const Handlebars = require('express-handlebars');
//console.log(statesUS);

Handlebars.registerHelper('eachState', function (statesUS) { 
    const statesArr = Object.keys(statesUS)
    //console.log(statesArr[1])
    return statesArr;
})

module.exports = states;
