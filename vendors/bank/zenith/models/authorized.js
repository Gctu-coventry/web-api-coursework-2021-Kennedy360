const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorizedSchema = new Schema({
    reference: Mixed,
    recipient_account: Number,
    depositor_account: Number,
    amount: Number,
    confirmed: String,
    created: Number
})

const Authorized = mongoose.model("Authorized", AuthorizedSchema)

module.exports = Authorized