const ejs = require('ejs')


module.exports = function(req,res){
        res.writeHead(200, { 'Content-Type': 'text/html' })
        ejs.renderFile("views/payment_gateway/views/pages/gateway_pages/dashboard_createArrears.ejs", function(err,data){
            if(err) console.log(err)
          res.end(data);
  })
    }