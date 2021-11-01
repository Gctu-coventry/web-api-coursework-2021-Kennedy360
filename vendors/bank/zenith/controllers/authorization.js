const verificationController = require("./verification")

exports.authorize = (res,data) => {
    verificationController.checkBalance(res,data)
}