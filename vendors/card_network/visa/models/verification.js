const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BankSchema = new Schema({
    bin: Number,
    bank_name: String 
})

const BankModel = mongoose.model("Banks", BankSchema)
module.exports = BankModel