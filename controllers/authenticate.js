const userModel = require('../models/userModel')

exports.verify = (res,data)=>{    
    userModel.find({username: data.username, password: data.password}, (err, result)=>{
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"status": 404, "Error": "User doesn't exist"}))
        } else{
            if(result.length == 0){
                res.end(JSON.stringify({"message": "User Doesn't Exist"}))
            }else{
                res.end(JSON.stringify({"message": "User Exist"}))
            }
        }
    })
}