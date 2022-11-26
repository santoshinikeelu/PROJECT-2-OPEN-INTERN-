 const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const axios = require('axios')

const {isValidFullName,isValidName, isValidBody} = require('../validator/validator')
const createCollege = async function (req, res) {
   
    
    try {
        const requestBody = req.body
        const { name, fullName, logoLink } = requestBody
        if (!name) return res.status(400).send({ status: false, message: 'Please fill name.' })
        if (!fullName) return res.status(400).send({ status: false, message: 'Please fill fullName.' })
        if (!logoLink) return res.status(400).send({ status: false, message: 'Please fill logoLink.' })   
        if (!isValidBody(requestBody)) return res.status(400).send({ status: false, messege: "plz provide request body" })
        if (!isValidName(name))  return res.status(400).send({ status: false, messege: "plz provide valid name" })
        if (!isValidFullName(fullName))  return res.status(400).send({ status: false, messege: "plz provide valid fullName" })
        
        //validation for url
      let correctLink = false
      await axios.get(logoLink)
         .then((res) => { correctLink = true })
         .catch((error) => { correctLink = false })
      if (correctLink === false) {
         return res.status(400).send({ status: false, message: "URL is wrong" })
      }
        let duplicateName= await collegeModel.findOne({ name })
        if (duplicateName) return res.status(404).send({ status: false, msg: "Name already exists." })
        // Create college
        const newCollege = await collegeModel.create(requestBody)
        const obj = {
            name : newCollege.name,
            fullName : newCollege.fullName,
            logoLink : newCollege.logoLink,
            isDeleted : newCollege.isDeleted
        }
        return res.status(201).send({ status: true, messege: 'college register succesefully', data: obj })
    }
    catch (err) {
        return res.status(500).send({ status: false,MSG:"INTERNAL SERVER ERROR", messege: err.message })
    }
}

//get collegedetails
const getCollege = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
 const name = req.query.collegeName;
        if (!name) return res.status(400).send({ status: false, massege: 'collegeName is required for query.' });

        const existCollege = await collegeModel.findOne({ name });
        if (!existCollege) return res.status(400).send({ status: false, massege: `'${name} college dose't exists.` });

        const interns = await internModel.find({ collegeId: existCollege._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });

        const data = {
            name: existCollege.name,
            fullName: existCollege.fullName,
            logoLink: existCollege.logoLink,
            interns: interns
        };

        return res.status(200).send({ status: true, data: data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, MSG:"INTERNAL SERVER ERROR",error: err.message });
    }
};

module.exports = { createCollege, getCollege }