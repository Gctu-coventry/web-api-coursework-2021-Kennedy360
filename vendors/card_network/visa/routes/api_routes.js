const fetch = require('node-fetch')

// Controllers
const verificationController = require("../controllers/verification")

const baseUrl = "/fras/vendors/visa"

module.exports = function(req,res){
    const method = req.method
    const url = req.url
    let body=''

    if(url === `${baseUrl}/authorization` && method === "POST"){
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on("end", ()=>{
            const {recipient_account,amount, card_number, card_expiry_month, card_expiry_year, card_cvv} = JSON.parse(body)
            const data = {
                recipient_account : recipient_account,
                amount : amount,
                card_number : card_number,
                card_expiry_month : card_expiry_month,
                card_expiry_year : card_expiry_year,
                card_cvv : card_cvv
            }
            
            // Call the verification endpoint
            fetch("http://localhost:5000/fras/vendors/visa/verification",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.text()).then(data => res.end(data)).catch(err => res.end(err))


        })
    } else if(url === `${baseUrl}/verification` && method === "POST"){
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on("end", ()=>{
            const {recipient_account,amount, card_number, card_expiry_month, card_expiry_year, card_cvv} = JSON.parse(body)
            const data = {
                recipient_account : recipient_account,
                amount : amount,
                card_number : card_number,
                card_expiry_month : card_expiry_month,
                card_expiry_year : card_expiry_year,
                card_cvv : card_cvv
            }
            verificationController.verifyCard(res,data);
        })
    }
    else{
        res.end(JSON.stringify({"Message": "Resource Not Available"}));
    }
}