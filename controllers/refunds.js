const refundsModel = require('../models/refundsModel')
const responseUtil = require('../utils/response')

// Reference Generator
const referenceUtils = require('../utils/reference')

var date = Date.now()

exports.createRefunds = (res,data)=>{
    
    const body = data

    const transaction_reference = body.transaction_reference
    const amount = body.amount
    const currency = body.currency

    const refund = new refundsModel({
        reference: referenceUtils.shuffle(),
        transaction_reference,
        amount,
        currency,
        created : date
    })

    refund.save()
    responseUtil.status(res,200)
    // return this.getRefund(res,body.reference)
    // res.end(JSON.stringify({"message": "Hello"}))
    // res.send({message: "Successfully made refund"})
    
}

exports.getRefund = (res,reference)=>{
    var refund_reference = reference;
    refundsModel.find({"reference":refund_reference}, (err, result)=>{
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"Error":"Reference doesn't exist"}))
        }else{
            res.end(JSON.stringify(result))
        }
    })
}

exports.getRefunds = (res) =>{
    refundsModel.find({}, (err, result)=>{
        if(err){
            res.status(404)
            res.end(JSON.stringify({"Error":"Refunds Data doesn't exist"}))
        }else{
            res.end(JSON.stringify(result))
        }
    })
}