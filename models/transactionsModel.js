const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new mongoose.Schema({
    "reference" : Schema.Types.Mixed,
    "transaction_type" : String,
    "customer_name" : String,
    "customer_email" : Schema.Types.Mixed,
    "customer_phoneNumber" : Number,
    "item_bought" : Array,
    "student_id" : Number,
    "amount" : Number,
    "currency" : String,
    "payment_method" : String,
    "payment_reference" : {type: Schema.Types.Mixed, required: true},
    "refund_status" : String,
    "status" : String,
    "created" : Date
})

module.exports = mongoose.model("Transaction", TransactionSchema)