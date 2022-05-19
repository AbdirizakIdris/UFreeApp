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
    // store the data availability as object rather than a string
    dateAvailability: [{
        id : {type :  mongoose.Schema.Types.ObjectId},
        title : {type : String},
        date : {type : String}
    }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;