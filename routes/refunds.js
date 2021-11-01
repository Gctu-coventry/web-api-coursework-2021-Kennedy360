// Controller
const refundsController = require('../controllers/refunds')
const transactionsController = require('../controllers/transactions')
const responseUtil = require('../utils/response')


const apiRoute = "/api/v1/refunds"

module.exports = function(req,res){
    const url = req.url;
    const method = req.method;
    const param = url.split('/')
    let body = ''

    if(url === apiRoute && method === "GET"){
        refundsController.getRefunds(res);
    }
    else if(url.match(/\/api\/v1\/refunds\/([A-Za-z0-9]+)/) && param.length == 5 && method === "GET"){
        const reference = param[4]
        refundsController.getRefund(res,reference)
    }
    else if(url === apiRoute && method === "POST"){
        req.on('data', (chunk)=>{
            body += chunk.toString()
        })
        req.on("end",()=>{
            const {transaction_reference,amount,currency} = JSON.parse(body)
            const keys = ["transaction_reference","amount","currency"]
            const values = [transaction_reference,amount,currency]
            const data = responseUtil.setData(keys,values)
            refundsController.createRefunds(res,data)
            transactionsController.updateStatus(transaction_reference,"Refunded")
        })
    }
    else{ 
        res.writeHead(404)
        res.end(JSON.stringify({'Status':'404','Error':'Resource is not avaialble'}))
    }
}
