const http = require('http')
const fs = require("fs")

const port = process.env.PORT || 5000;

// Custom Imports of routes
const paymentsRoutes = require("./routes/payments")
const arrearsRoute = require("./routes/arrears")
const transactionsRoute = require("./routes/transactions")
const refundsRoute = require("./routes/refunds")

// Gateway Routes
const gatewayArrear = require("./routes/gateway_routes/arrears")
const gatewayPayment = require("./routes/gateway_routes/payments")
const gatewayTransaction = require("./routes/gateway_routes/transactions")
const gatewayRefund = require("./routes/gateway_routes/refunds")
const gatewayItem = require("./routes/gateway_routes/createArrears")
const gatewayLogin = require("./routes/gateway_routes/login")
const gatewayAuthenticate = require("./routes/authenticate")

// Card Association
const visaApiRoutes = require("./vendors/card_network/visa/routes/api_routes")

// Zenith Bank
const zenithApiRoutes = require("./vendors/bank/zenith/routes/api_routes")

// School Website
const schoolRoutes = require("./views/school_website/routes/all_routes")

// CSS
const cssRoute = require("./routes/assets_routes/css")

// Image
const imageRoute = require("./routes/assets_routes/images")

// JS
const scriptRoute = require("./routes/assets_routes/script")

// Middleware
const api_auth = require("./middleware/auth")

// Database Connection
const mongo = require("./database/connection")

// Session middleware
const session = require("./middleware/session")

const server = http.createServer((req,res)=> {

  
  res.setHeader('Content-Type','application/json')
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Max-Age", "6000")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


  if(req.url.match(/\/api\/v1\/arrears/)){
      if(api_auth(req,res) === "Verified"){
      arrearsRoute(req,res)
      }
  } else if(req.url.match(/\/api\/v1\/payments/)){
      if(api_auth(req,res) === "Verified"){ paymentsRoutes(req,res);}
  }
   else if(req.url.match(/\/api\/v1\/transactions/)){
      if(api_auth(req,res) === "Verified"){ transactionsRoute(req,res);}
  }
  else if(req.url.match(/\/api\/v1\/refunds/)){
      if(api_auth(req,res) === "Verified"){refundsRoute(req,res);}
  } else if(req.url === "/fras/arrears" && req.method === "GET"){
    if(session(req).User === "FrasUser"){
            gatewayArrear(req,res)
      }
        else{
            gatewayLogin(req,res);
        }
  } else if(req.url === "/fras/payments" && req.method === "GET"){
      if(session(req).User === "FrasUser"){
        gatewayPayment(req,res)
      }
      else{
          gatewayLogin(req,res);
      }
  }  else if(req.url === "/fras/transactions" && req.method === "GET"){
    if(session(req).User === "FrasUser"){
        gatewayTransaction(req,res)
      }
      else{
          gatewayLogin(req,res);
      }
  }  else if(req.url === "/fras/refunds" && req.method === "GET"){
    if(session(req).User === "FrasUser"){
        gatewayRefund(req,res)
      }
      else{
          gatewayLogin(req,res);
      }
  } else if(req.url === "/fras/arrears-create"){
    if(session(req).User === "FrasUser"){
        gatewayItem(req,res)
      }
      else{
          gatewayLogin(req,res);
      }
  } else if(req.url === "/fras/login" && req.method === "GET"){
      gatewayLogin(req,res)
  } else if(req.url === "/fras/login/authenticate" && req.method === "POST"){
      gatewayAuthenticate(req,res)
  } else if(req.url.match(/\/css/)){
        cssRoute(req,res)
  } else if(req.url.match(/\/uploads/)){
        const param = req.url.split('/')
      res.writeHead(200, {"Content-Type":"image/*"})
      var fileContents = fs.readFileSync(`./uploads/${param[2]}`, {encoding: 'utf8'});
      res.end(fileContents);
  }
  else if(req.url.match(/\/image/)){
        imageRoute(req,res)
  }
 else if(req.url.match(/\/js/)){
        scriptRoute(req,res)
  }
   else if(req.url.match(/\/fras\/vendors\/visa/)){
          visaApiRoutes(req,res)
  } else if(req.url.match(/\/fras\/vendors\/zenith/)){
        zenithApiRoutes(req,res)
  } else if(req.url.match(/\/fras\/school/)){
        schoolRoutes(req,res)
  } else if(req.url.match("/")){
    schoolRoutes(req,res)
}
  else{
    res.writeHead(404, 'Content-Type : text/html')
    res.end("Sorry. Webpage or Web Resource doesn't exist");
  }

});
server.listen(port, ()=> console.log(`Server running on port ${port}`));

