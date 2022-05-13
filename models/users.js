const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    friends: [{
        type: String, //friends will be an array of strings
    }],
    groups: String,
    dateAvailability: [{
        type: String, 
    }], 

});

const User = mongoose.model("User", UserSchema);

module.exports = User;