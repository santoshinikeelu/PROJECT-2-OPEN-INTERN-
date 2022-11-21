
const mongoose= require('mongoose')
const ObjectId= mongoose.Schema.Types.ObjectId
const internSchema= new mongoose.Schema({

name:{
    require:true
},

email:{
    type:String,
    unique:true,
    require:true
},
mobile:{
    type:Number,
    unique:true,
    require:true
},

collegeId:{
type:ObjectId,
ref:"college"
},

isDelete:{
    type:Boolean,
    default:false
}
},{timestamps:true})


module.exports=mongoose.model("intern" ,internSchema )
