// Controller
const arrearController = require('../controllers/arrears')
const responseUtil = require('../utils/response')

const apiRoute = "/api/v1/arrears"

module.exports = function(req,res){
    const url = req.url;
    const method = req.method;
    const param = url.split('/')
    let body = ''

    if(url === apiRoute && method === "GET"){
        arrearController.getArrears(res)
    }
    else if(url.match(/\/api\/v1\/arrears\/([0-9]+)/) && param.length == 5 && method === "GET"){
        const id = param[4]
        arrearController.getArrear(res,id)
    }
    else if(url === apiRoute && method === "POST"){
        req.on('data', (chunk)=>{
            body += chunk.toString()
        })
        req.on("end",()=>{
            const {student_id, student_name, student_class, student_course, fees_owed } = JSON.parse(body);
            const keys = ["student_id", "student_name", "student_class", "student_course", "fees_owed"]
            const values = [student_id, student_name, student_class, student_course, fees_owed]
            const data = responseUtil.setData(keys,values)
            arrearController.createArrears(res,data)
        })
    } else if(url.match(/\/api\/v1\/arrears\/([0-9]+)/) && param.length == 5 && method === "DELETE"){
        const id = param[4]
        arrearController.deleteArrear(res,id)
    }
    else{ 
        res.writeHead(404)
        res.end(JSON.stringify({'Status':'404','Error':'Resource is not avaialble'}))
    }
}
