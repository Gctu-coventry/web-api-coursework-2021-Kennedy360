var fs = require("fs")

const base_url = "/js"

function processScript(res,script_name){
    var fileContents = fs.readFileSync(`./public/js/${script_name}`,{encoding: 'utf8'});
    res.writeHead(200, {"Content-Type":"text/javascript"})
    res.end(fileContents)
}

module.exports = function(req,res){
    const method = req.method
    const url = req.url
    if(url === `${base_url}/main.js` && method === "GET"){
        processScript(res,"main.js")
    }
    else if(url === `${base_url}/index.js` && method === "GET"){
        processScript(res,"index.js")
    }else if(url === `${base_url}/cookie.js` && method === "GET"){
        processScript(res,"cookie.js")
    }
}