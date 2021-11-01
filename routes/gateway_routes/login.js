const ejs = require('ejs')


// Model
const userModel = require('../../models/arrearsModel.js')


module.exports = function(req,res){
userModel.find({}, (err, result)=>{
    if(err){
        res.end(JSON.stringify({"Error":"Reference doesn't exist"}))
    }else{
        res.writeHead(200, { 'Content-Type': 'text/html' })
        ejs.renderFile("views/payment_gateway/views/pages/gateway_pages/dashboard_login.ejs",{result: result}, function(err,data){
            if(err) console.log(err)
          res.end(data);
  })
    }
})
}