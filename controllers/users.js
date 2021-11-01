// User Model
const userModel = require("../models/userModel")

exports.verify = (res,data) => {
    userModel.find({"username":data.username,"password":data.password},(err,result) =>{
        if(err){
            res.end(err)
        }else{
            console.log(result)
        }
    }
    )
    return {status:"User Exists"};
}