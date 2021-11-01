var fs = require("fs")

const base_url = "/css"

function processCss(res,style_name){
    var fileContents = fs.readFileSync(`./public/css/${style_name}`,{encoding: 'utf8'});
    res.writeHead(200, {"Content-Type":"text/css"})
    res.end(fileContents)
}

module.exports = function(req,res){
    const method = req.method
    const url = req.url
    if(url === `${base_url}/paybox.css` && method === "GET"){
        processCss(res,"paybox.css")
    }
    else if(url === `${base_url}/gateway.css` && method === "GET"){
        processCss(res,"gateway.css")
    }
    else if(url === `${base_url}/styles.css` && method === "GET"){
        processCss(res,"styles.css")
    }
    else if(url === `${base_url}/site_styles.css` && method === "GET"){
        processCss(res,"site_styles.css")
    }
}