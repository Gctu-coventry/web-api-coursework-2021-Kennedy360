// Controller
const transactionController = require('../controllers/transactions')
const responseUtil = require('../utils/response')


const apiRoute = "/api/v1/transactions"

module.exports = function(req,res){
    const url = req.url;
    const method = req.method;
    const param = url.split('/')
    let body = ''

    if(url === apiRoute && method === "GET"){
        res.setHeader("status",200)
        transactionController.getTransactions(res);
    }
    else if(url.match(/\/api\/v1\/transactions\/([A-Za-z0-9]+)/) && param.length == 5 && method === "GET"){
        const transaction_reference = param[4]
        transactionController.getTransaction(res,transaction_reference)
    }
    else if(url === apiRoute && method === "POST"){
        req.on('data', (chunk)=>{
            body += chunk.toString()
        })
        req.on("end",()=>{
            const {transaction_type, customer_name, customer_phoneNumber, customer_email, item_bought, student_id, amount, currency, payment_method, payment_reference} = JSON.parse(body);
            const keys = ["transaction_type", "customer_name", "customer_phoneNumber", "customer_email", "item_bought", "student_id", "amount", "currency", "payment_method", "payment_reference"]
            const values = [transaction_type, customer_name, customer_phoneNumber, customer_email, item_bought, student_id, amount, currency, payment_method, payment_reference]
            const data = responseUtil.setData(keys,values)
            transactionController.createTransaction(res,data)
        })
    }
    else{ 
        res.writeHead(404)
        res.end(JSON.stringify({'Status':'404','Error':'Resource is not avaialble'}))
    }
}
