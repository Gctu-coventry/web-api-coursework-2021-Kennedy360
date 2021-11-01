// Controller
const authenticateController = require('../controllers/authenticate')
const responseUtil = require('../utils/response')


module.exports = function(req,res){
    let body = ''
        req.on('data', (chunk)=>{
            body += chunk.toString()
        })
        req.on("end",()=>{
            req.headers.session = "User"
            const {username,password} = JSON.parse(body)
            const keys = ["username","password"]
            const values = [username,password]
            const data = responseUtil.setData(keys,values)
            authenticateController.verify(res,data)
        })
    }
