const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BankAccountSchema = new Schema({
    reference: String,
    name: String,
    phone_number: Number,
    account_type: String,
    account_number: Number,
    card_number: Number,
    card_expiry_month: Number,
    card_expiry_year: Number,
    card_cvv: Number,
    amount: Number,
    currency: String
})

const BankAccountModel = mongoose.model("BankAccount", BankAccountSchema)
module.exports = BankAccountModel