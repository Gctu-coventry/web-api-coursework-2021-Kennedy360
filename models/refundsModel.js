const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RefundsSchema = new mongoose.Schema({
    "reference" : Schema.Types.Mixed,
    "transaction_reference" : {type: Schema.Types.Mixed, required: true},
    "amount" : {type: Number, required: true},
    "currency" : String,
    "created" : Number
})

module.exports = mongoose.model("Refund",RefundsSchema);