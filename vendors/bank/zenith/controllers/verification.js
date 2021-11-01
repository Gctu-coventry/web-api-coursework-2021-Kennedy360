const BankAccountModel = require('../models/account')



exports.verifyCard = (res,data) => {
    const card_number = data.card_number
    const card_expiry_month = data.card_expiry_month
    const card_expiry_year = data.card_expiry_year
    const card_cvv = data.card_cvv

    BankAccountModel.find({"card_number":card_number,"card_expiry_month":card_expiry_month, "card_expiry_year": card_expiry_year, "card_cvv" : card_cvv}, (err,result) => {
        if(err) console.log(err)
        if(result.length > 0){
        const resultData = {
            "exists" : "true",
            "name": result[0].name,
            "account_number": result[0].account_number
        }

        res.end(JSON.stringify(resultData))
    }else{
        res.end(JSON.stringify({"exists": "false"}))
    }
    })
}

exports.checkBalance = (res,data) =>{
    BankAccountModel.find({"account_number":data.depositor_account},(err,result)=>{
        if(err) console.log(err)
        if(result[0].amount > data.amount){
            res.end(JSON.stringify({"status": "Approved"}))
        }else{
            res.end(JSON.stringify({"status": "Declined"}))
        }
    })
}