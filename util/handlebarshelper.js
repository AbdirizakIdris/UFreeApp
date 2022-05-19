const hbs = require('hbs')

// Using handlebars in script tags does not work without this
// NO CLUE WHY : (
// All it really does is convert a json to string
hbs.registerHelper("json", function (v) {
    return JSON.stringify(v);
});