const arrearsModel = require('../models/arrearsModel')
const responseUtil = require('../utils/response')

// Reference Generator
const referenceUtils = require('../utils/reference')

var date = Date.now()
exports.createArrears = (res,data)=>{

    var reference = referenceUtils
    const body = data

    const student_id = body.student_id
    const student_name = body.student_name
    const student_class = body.student_class
    const student_course = body.student_course
    const fees_owed = body.fees_owed

    const arrear = new arrearsModel({
        reference: reference.shuffle(),
        student_id: student_id,
        student_name: student_name,
        student_class: student_class,
        student_course: student_course,
        fees_owed: fees_owed,
        date_created: date
        });
    arrear.save()
    responseUtil.status(res,200)
    // this.getArrear(res,body.student_id)
}

exports.getArrear = (res,id)=>{    
    var student_id = id
    arrearsModel.find({"student_id": student_id}, (err, result)=>{
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"Status": 404, "Error": "Student ID doesn't exist"}))
        } else{
            res.end(JSON.stringify(result))
        }
    })
}

exports.getArrears = (res) =>{
    arrearsModel.find({}, (err, result)=>{
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"Status": 404, "Error": "Student ID doesn't exist"}))
        } else{
            res.end(JSON.stringify(result))
        }
    })
    
}

exports.deleteArrear = (res, id) => {
    var student_id = id
    arrearsModel.findOneAndDelete({"student_id": student_id}, (err, result)=>{
        if(err){
            res.writeHead(404, { 'Content-Type' : 'application/json'})
            res.end(JSON.stringify({"Status": 404, "Error": "Student ID doesn't exist"}))
        } else{
            // res.end(JSON.stringify(result))
            if(arrearsModel.find({"student_id": student_id}).count() == "0"){
                // this.getArrear(res,student_id)
                res.end(JSON.stringify({"status":"Failed", "message" : "No Student Arrears for that ID exist"}))
            }else{
            res.end(JSON.stringify({"status":"Success", "message" : "Student Arrears Deleted Successfully"}))
            }
        }
    })
}
