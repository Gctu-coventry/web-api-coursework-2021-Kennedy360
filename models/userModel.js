const mongoose = require("mongoose")
const Schema = mongoose.Schema


// Creating Schema
const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true
  },
  password: {
      type: Schema.Types.Mixed,
      required: true
  }
})

module.exports = mongoose.model("Users", userSchema)