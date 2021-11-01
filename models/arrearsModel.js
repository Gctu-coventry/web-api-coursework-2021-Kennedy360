const mongoose = require('mongoose')
const Schema = mongoose.Schema

ArrearsSchema = mongoose.Schema({
    "reference" : Schema.Types.Mixed,
    "student_id" : { type: Number, required: true},
    "student_name" : String,
    "student_class" : String,
    "student_course" : String,
    "fees_owed" : { type: Number, required: true},
    "date_created" : Number
})

module.exports =  mongoose.model('Arrears',ArrearsSchema);