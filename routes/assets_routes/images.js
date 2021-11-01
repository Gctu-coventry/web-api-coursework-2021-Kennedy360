var fs = require("fs")

const base_url = "/image"

function processImage(res,image_name){
    var fileContents = fs.readFileSync(`./public/images/${image_name}`);
    res.writeHead(200, {"Content-Type":"image/jpg"})
    res.end(fileContents,'binary')
}

module.exports = function(req,res){
    const method = req.method
    const url = req.url
    if(url === `${base_url}/blaise.jpg` && method === "GET"){
        processImage(res,"blaise.jpg")
    }
    else if(url === `${base_url}/student2.jpg` && method === "GET"){
        processImage(res,"student2.jpg")
    }
    else if(url === `${base_url}/parent.jpg` && method === "GET"){
        processImage(res,"parent.jpg")
    }
    else if(url === `${base_url}/books.jpg` && method === "GET"){
        processImage(res,"books.jpg")
    }
}