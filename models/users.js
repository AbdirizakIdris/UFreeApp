const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    friends: [{
        type: String, //friends will be an array of strings
    }],
    groups: [{
        type: String,
    }],
    dateAvailability: [{
        type: String, // this will be an array of dates in strings
    }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;