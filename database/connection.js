const mongoose = require("mongoose")

const databaseName = "MagPay"

const mongoUrl = `mongodb://localhost:27017/${databaseName}`

mongoose.connect(mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const db = mongoose.connection;

db.on("error", err => console.log(err))

db.once("open",()=>console.log("Connection Opened For Fras Payment Gateway"))

db.on("connected", (err,res) => console.log(res))

module.exports = db
