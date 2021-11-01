const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthSchema = new mongoose.Schema({
    "client_id" : String,
    "api_key" : Schema.Types.Mixed,
    "expiry" : Date,
    "created" : Date
})

module.exports = mongoose.model("Auth",AuthSchema)