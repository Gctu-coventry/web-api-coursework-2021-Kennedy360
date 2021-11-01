const fetch = require('node-fetch')


// Model
const BankModel = require("../models/verification")

exports.verifyCard = (res,data) =>{
    var postData = data
    let card_num = postData.card_number.toString()
    let card_stripped = Number(card_num.slice(1,6))
    BankModel.find({},(err,data)=>{
        if(err) console.log(err)
        if(data[0].bin === card_stripped) verificationResult(res,data[0].bank_name,postData)
    })    
}

const verificationResult = (res,bank,result) =>{
    const bank_name = bank.toLowerCase()
    fetch(`http://localhost:5000/fras/vendors/${bank_name}/verification`, {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(res => res.text()).then(data => {
        const response = JSON.parse(data)
        const depositor_account = response.account_number

        // Authorization data
        const authData = {
            "recipient_account" : result.recipient_account,
            "depositor_account" : depositor_account,
            "amount" : result.amount,
        }

        if(response.exists == "true"){
            fetch(`http://localhost:5000/fras/vendors/${bank_name}/authorization`, {
                method: "POST",
                body: JSON.stringify(authData),
                headers: {
                    'Content-Type' : 'application/json'
                }
        }).then(resp => resp.text()).then(respJson => res.end(respJson))

        }else{
            res.end(data)
        }
    })
}