const collegeModel = require("../models/collegeModel")
const {isValid,isValidRequestBody}= require("../validator/validator")
const validUrl=require("valid-url")
//const { Module } = require("module")


const createCollege = async function(){

    try{

        const requestBody= req.body
        if(isValidRequestBody(requestBody)){
            return res.status(400).send({status:false,messege:"plz provide request body"})
        }
        const { name,fullName,logoLink}=requestBody
        if(!isValid(name)){
            return res.status(400).send({status:false,messege:"plz provide name"})

        }
        
        if(!isValid(fullName)){
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