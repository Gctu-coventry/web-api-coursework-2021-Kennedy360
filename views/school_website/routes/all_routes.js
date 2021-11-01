// Controllers

const homeController = require("../controllers/home")

const ejs = require("ejs");


// Routes

const baseUrl = "/fras/school"

module.exports = function(req,res){
    const method = req.method
    const url = req.url
    let body=''

    if(url === `${baseUrl}/home` || url === "/" && method === "GET"){
        homeController(req,res)
    }
    else if(url === `${baseUrl}/payfees` && method === "GET"){
        res.writeHead(200, { 'Content-Type': 'text/html' })
        ejs.renderFile("./views/school_website/views/pages/paybox.ejs", function(err,data){
            if(err) console.log(err)
          res.end(data);
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