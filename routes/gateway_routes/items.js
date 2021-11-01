const ejs = require('ejs')
const formidable = require('formidable');


// Model
// const arrearsModel = require('../../models/arrearsModel.js')
const productModels = require('../../views/school_website/models/products.js')


module.exports = function(req,res){

  const url = req.url;
  const method = req.method;
  const param = url.split('/')
  let body = ''

if(method === "GET"){
      res.writeHead(200, { 'Content-Type': 'text/html' })
      ejs.renderFile("views/payment_gateway/views/pages/gateway_pages/dashboard_item.ejs",{result: "result"}, function(err,data){
          if(err) console.log(err)
        res.end(data);
      })
    }
    else if(method === "POST"){

      const form = formidable({ multiples: false, uploadDir: "./uploads", keepExtensions: true});

      form.parse(req, (err, fields, files) => {
        if (err) {
          res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
          res.end(String(err));
          return;
        }
        const filename = `${files.create_product_image.path}`;
        const stripped_filename = filename.substr(8);
        productModels.create({"item_name":fields.create_product_name,"price":fields.create_product_price,"image":stripped_filename},(err,result)=>{
          if(err) console.log(err)
          console.log(result)
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fields, files }, null, 2));
        
      });
  
      return;

    }else{
      res.writeHead(404,{"Content-Type": "Resource not available"})
    }
}