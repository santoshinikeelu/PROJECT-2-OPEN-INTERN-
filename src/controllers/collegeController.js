const collegeModel = require("../models/collegeModel")
const valid = require("../validator/validator")
const validUrl=require("valid-url")
//const { Module } = require("module")


const createCollege = async function(req,res){

    try{

        const requestBody= req.body
       
        const { name,fullName,logoLink}=requestBody
        if(!valid.isValidRequestBody(requestBody)){
            return res.status(400).send({status:false,messege:"plz provide request body"})
        }

        
        if(!valid.isValid(name)){
            return res.status(400).send({status:false,messege:"plz provide name"})

        }
        
        if(!valid.isValid(fullName)){
            return res.status(400).send({status:false,messege:"plz provide fullName"})

        }
        if(!validUrl.isUri(logoLink.trim())){
            return res.status(400).send({status:false,messege:"Invalid logoLink"})
        }
const isNameAlreadyUsed=await collegeModel.findOne({name})
if(isNameAlreadyUsed){
    return res.status(400).send({status:false,messege:"Name is alerady use try another name"})
}
 const newCollege = await collegeModel.create(requestBody)
 return res.status(201).send({status:true,messege:'college register succesefully', data:newCollege})

    }
    catch(err){

return res.status(500).send({status:false,messege:'err.msg'})
    }
}







module.exports={createCollege}