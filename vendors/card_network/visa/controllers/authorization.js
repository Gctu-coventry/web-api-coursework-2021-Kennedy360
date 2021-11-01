
const baseUrl = "/fras/vendors/visa"

module.exports = function(req,res){
    const method = req.method
    const url = req.url
    let body=''

    if(url === `${baseUrl}/authorization` && method==="POST"){
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on("end", ()=>{
            const {recipient_account,amount, card_number, card_expiry_month, card_expiry_year, card_cvv} = JSON.parse(body)
            // res.end(name)
        })
    }
}