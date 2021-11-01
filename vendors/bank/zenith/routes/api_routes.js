// Controllers
const authorizationController = require("../controllers/authorization")
const verificationController = require("../controllers/verification")

const baseUrl = "/fras/vendors/zenith"

module.exports = function(req,res){
    const method = req.method
    const url = req.url
    let body=''

    if(url === `${baseUrl}/authorization` && method === "POST"){
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on("end", ()=>{
            const {recipient_account,amount, depositor_account} = JSON.parse(body)
            const data = {
                recipient_account: recipient_account,
                depositor_account : depositor_account,
                amount : amount
            }
            authorizationController.authorize(res,data)
            
        })
    }
    else if(url === `${baseUrl}/verification` && method === "POST"){
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on("end", ()=>{
            const {card_number, card_expiry_month, card_expiry_year, card_cvv} = JSON.parse(body)
            const data = {
                card_number: card_number,
                card_expiry_month : card_expiry_month,
                card_expiry_year : card_expiry_year,
                card_cvv : card_cvv
            }
            verificationController.verifyCard(res,data)
        })
    }
}