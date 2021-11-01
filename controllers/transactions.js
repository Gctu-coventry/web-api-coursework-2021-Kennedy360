const transactionModel = require('../models/transactionsModel')
const responseUtil = require('../utils/response')

// Reference Generator
const referenceUtils = require('../utils/reference')

var date = Date.now()

exports.createTransaction = (res,data) => {
    const reference = referenceUtils.shuffle()
    const body = data

    const transaction_type = body.transaction_type
    const customer_name = body.customer_name
    const customer_phoneNumber = body.customer_phoneNumber
    const customer_email = body.customer_email
    const item_bought = body.item_bought
    const student_id = body.student_id
    const amount = body.amount
    const currency = body.currency
    const payment_method = body.payment_method
    const payment_reference = body.payment_reference
    const refund_status = "Not Refunded"
    const created = date

    const transaction = new transactionModel({
        reference,
        transaction_type : transaction_type,
        customer_name : customer_name,
        customer_phoneNumber : customer_phoneNumber,
        customer_email : customer_email,
        item_bought : item_bought,
        student_id : student_id,
        amount : amount,
        currency,
        payment_method : payment_method,
        payment_reference: payment_reference,
        status: data.status,
        refund_status,
        created : created
    })

    transaction.save();
    responseUtil.status(res,200);
    // this.getTransaction(res,body.reference)
}
exports.getTransaction = (res,reference) => {
    const transaction_reference = reference
    transactionModel.find({"reference" : transaction_reference}, (err, result) => {
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"Error": "Transaction reference doesn't exist"}))
        }else{
            res.end(JSON.stringify(result))
        }
    })
}
exports.getTransactions = (res) => {
    transactionModel.find({}, (err, result) => {
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"Error": "Transaction Data not available"}))
        }else{
            res.end(JSON.stringify(result))
        }
    })
}

exports.updateStatus = (reference,status) => {
    transactionModel.findOneAndUpdate({reference: reference},{refund_status: status},{new:true},(err,result)=>{
        if(err){
            console.error(err)
        }else{
            console.log("Ref"+result)
        }
    })
}