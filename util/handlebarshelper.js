const hbs = require("hbs");
// handlebars helper to check for object presence in array
hbs.registerHelper("contains", function (value, array, options) {
    return options[array.includes(value) ? "fn" : "inverse"](this);
});

hbs.registerHelper("containsId", function (value, array, options) {
    return options[array.some(x => x.toString() === value.toString()) ? "fn" : "inverse"](this);
});



// Using handlebars in script tags does not work without this
// NO CLUE WHY : (
// All it really does is convert a json to string
hbs.registerHelper("json", function (v) {
    return JSON.stringify(v);
});


