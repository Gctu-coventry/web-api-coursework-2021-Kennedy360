// Fetch
const fetch = require("node-fetch")

const api_auth = require("../middleware/auth")

// Controller
const paymentController = require('../controllers/payments')
const transactionController = require('../controllers/transactions')
const responseUtil = require('../utils/response')

const apiRoute = "/api/v1/payments"

module.exports = function(req,res){
    const url = req.url;
    const method = req.method;
    const param = url.split('/')
    let body = ''

    if(url === apiRoute && method === "GET"){
        res.setHeader("status",200)
        paymentController.getPayments(res);
    }
    else if(url.match(/\/api\/v1\/payments\/([A-Za-z0-9]+)/) && param.length == 5 && method === "GET"){
        const reference = param[4]
        paymentController.getPayment(res,reference)
    }
    else if(url === apiRoute && method === "POST"){
        if(api_auth(req,res) === "Verified"){
            
        req.on('data', (chunk)=>{
            body += chunk.toString()
        })
        req.on("end",()=>{
            const {student_id, depositor_name, depositor_email, payment_method, amount, currency, card_number, card_expiry_month, card_expiry_year, card_cvv, phone_number} = JSON.parse(body);
            const keys = ["student_id", "depositor_name", "depositor_email", "payment_method", "amount", "currency", "card_number", "card_expiry_month", "card_expiry_year", "card_cvv", "phone_number"];
            const values = [student_id, depositor_name, depositor_email, payment_method, amount, currency, card_number, card_expiry_month, card_expiry_year, card_cvv, phone_number];
            const Data = responseUtil.setData(keys,values)

            var result = paymentController.createPayment(Data);

            // 4242424242424242

            fetch("http://localhost:5000/fras/vendors/visa/authorization",{
                method: "POST",
                body: JSON.stringify(Data),
                headers: {
                    "Content-Type":"application/json"
                }
            }).then(res => res.text()).then(data => {
                const data_parsed = JSON.parse(data)            

                let status = "";

                if(data_parsed.status === "Approved"){
                paymentController.updateStatus(result.student_id,"Succeeded");
                status = "Succeeded";

            }else{
                paymentController.updateStatus(result.student_id,"Failed");
                status = "Failed";
            }

                    const transaction_data = {
                        recipient_account: 554513648,
                        transaction_type: "Fee Payment",
                        customer_name: result.depositor_name,
                        customer_phoneNumber : phone_number,
                        customer_email: depositor_email,
                        student_id,
                        amount,
                        currency: "Ghc",
                        payment_method: "Card",
                        status,
                        payment_reference: result.reference
                    };
                    
                    transactionController.createTransaction(res,transaction_data);
                    res.end(JSON.stringify({"status":data_parsed.status}))
            })
        })
    }
    }
    else{ 
        res.writeHead(404)
        res.end(JSON.stringify({'Status':'404','Error':'Resource is not avaialble'}))
    }
}
