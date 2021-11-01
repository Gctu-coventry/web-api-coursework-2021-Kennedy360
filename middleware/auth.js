const base64 = require("js-base64")

const userController = require("../controllers/users")

module.exports = (req,res) => {
    if(req.headers.authentication === undefined){
        res.writeHead(401,{"Message":"Unauthorized"})
        res.end(JSON.stringify({"Message":"Authentication Required"}))
    }else{
        const authentication = req.headers.authentication
        const auth_split = authentication.split(" ")
        if(auth_split[0] != "Basic"){
            res.writeHead(401,{"Reason":"Wrong Authentication Provided"})
            res.end(JSON.stringify({"Message":"Authentication Requires Basic Authentication"}))
        }
        if(auth_split[1] == null){
            res.writeHead(401,{"Reason":"Wrong Credential Provided"})
            res.end(JSON.stringify({"Message":"Authentication Requires Base64 Encoded Credentials"}))
        }
        if(base64.isValid(auth_split[1])){

            const decoded_credentials = base64.decode(auth_split[1])
            const user_details = decoded_credentials.split(":");
            if(user_details.length != 2){
                res.writeHead(401,{"Reason":"Credentials not in good format"})
                res.end(JSON.stringify({"Message":"Wrong Credentials provided"}))
            }else{
                const verified = userController.verify(res,{"username":user_details[0],"password":user_details[1]})
                if(verified.status === "User Exists"){
                    return "Verified";
                }
            }
            

        }
    }
}