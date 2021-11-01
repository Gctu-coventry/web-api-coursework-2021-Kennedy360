const ejs = require('ejs')


// Model
// const productsModel = require('../models/products.js')


module.exports = function(req,res){
productsModel.find({}, (err, result)=>{
    if(err){
        res.end(JSON.stringify({"Error":"Products doesn't exist"}))
    }else{
        res.writeHead(200, { 'Content-Type': 'text/html' })
        ejs.renderFile("./views/school_website/views/pages/paybox.ejs",{result: result}, function(err,data){
            if(err) console.log(err)
          res.end(data);
        })
    }
})
}