const {Schema, model} = require("mongoose")

const userschema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

const User = model('User', userschema)

module.exports = User;
