const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const { isValidBody, isValidName, isValidEmail, isValidMobile } = require('../validator/validator')
const createInterns = async function(req, res)  {
    try {
        let reqBody = req.body
        let { name, email, mobile, collegeName } = reqBody

        if (!isValidBody(reqBody)) return res.status(400).send({ status: false, message: 'Please enter data.' })
        if (!name) return res.status(400).send({ status: false, message: 'Please fill name.' })
        if (!email) return res.status(400).send({ status: false, message: 'Please fill email.' })
        if (!mobile) return res.status(400).send({ status: false, message: 'Please fill mobile number.⚠️' })
        if (!collegeName) return res.status(400).send({ status: false, message: 'Please fill college name.' })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: 'Please enter valid name.' })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: 'Please enter valid email.' })
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, message: 'Please enter valid mobile number.⚠️' })
        const existCollegeName = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!existCollegeName) return res.status(400).send({ status: false, msg: "the college doesn't exist." })
        let duplicateEmail = await internModel.findOne({ email })
        if (duplicateEmail) return res.status(404).send({ status: false, msg: "Email already exists." })
        let duplicateMobile = await internModel.findOne({ mobile })
        if (duplicateMobile) return res.status(404).send({ status: false, msg: "Mobile already exists." })
        req.body.collegeId = existCollegeName._id
         const savedData = await internModel.create(reqBody);
        let obj = {
            isDeleted: savedData.isDeleted,
            name : savedData.name,
            email: savedData.email,
            mobile : savedData.mobile,
            collegeId : savedData.collegeId
        }
        return res.status(201).send({ status: true,msg:" intern created successfully" ,data: obj })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = {createInterns}