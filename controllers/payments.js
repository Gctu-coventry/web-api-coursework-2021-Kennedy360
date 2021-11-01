const paymentModel = require('../models/paymentModel');
const referenceUtils = require('../utils/reference')


var date = Date.now()

exports.createPayment = (data) => {
    const body = data
    const reference = referenceUtils.shuffle()
    
    const student_id = body.student_id
    const depositor_name = body.depositor_name
    const depositor_email = body.depositor_email
    const payment_method = body.payment_method
    const amount = body.amount
    const currency = body.currency
    const card_number = body.card_number
    const card_expiry_month = body.card_expiry_month
    const card_expiry_year = body.card_expiry_year
    const card_cvv = body.card_cvv
    const phone_number = body.phone_number
    const status = ""
    const created = date

    const payment_data = {
        reference,
        student_id,
        depositor_name,
        depositor_email,
        payment_method,
        amount,
        currency,
        card_number,
        card_expiry_month,
        card_expiry_year,
        card_cvv,
        phone_number,
        status,
        created: created
    }

    const payment = new paymentModel(payment_data)
    payment.save()
    return {"reference": payment_data.reference,"student_id": payment_data.student_id,"status" : payment_data.status, "phone_number": payment_data.phone_number}
}
exports.getPayment = (res,reference) => {
    const payment_reference = reference
    paymentModel.find({"reference": payment_reference}, (err, result)=>{
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"Status": 404, "Error": "Payment Reference doesn't exist"}))
        } else{
            res.end(JSON.stringify(result))
        }
    })
}
exports.getPayments = (res) => {
    paymentModel.find({}, (err, result)=>{
        if(err){
            res.end(JSON.stringify({"Status": 404, "Error": "Can't access the data"}))
        } else{
            res.end(JSON.stringify(result))
        }
    })
}

exports.updateStatus = (student_id,status) => {
    paymentModel.findOneAndUpdate({student_id: Number(student_id)},{status: status},{new:true},(err)=>{
        if(err){
            console.error(err)
        }
    })
}

