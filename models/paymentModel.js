const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new mongoose.Schema({
    "reference" : Schema.Types.Mixed,
    "student_id" : {type: Number, required: true},
    "depositor_name" : {type: String, required: true},
    "depositor_email" : Schema.Types.Mixed,
    "payment_method" : {type: String, required: true},
    "amount" : {type: Number, required: true},
    "currency" : String,
    "card_number" : Number,
    "card_expiry_month" : Number,
    "card_expiry_year" : Number,
    "card_cvv" : Number,
    "phone_number" : Number,
    "status": String,
    "created" : Number

})

module.exports = mongoose.model("Payment",PaymentSchema);