const mongoose = require('mongoose');

//isValidBody
const isValidBody = (data) => {
    if (Object.keys(data).length > 0)
        return true
    return false
};

//name
const isValidFullName = (name) => {
    const nm = name.trim()
    const regex =/^[a-z" "A-Z]+(([',. -][a-z" "A-Z ])?[a-z" "A-Z])$/.test(nm)
    return regex
}


//email
const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/.test(email)
    return regex
}

//Mobile 
const isValidMobile = (phone) => {
    // let regex = /^[6-9]{1}[0-9]{9}$/.test(phone)
    let regex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone)
    return regex
}

const isValidName = (name) => {
    let regex = /^[a-zA-Z" "]{2,}$/.test(name)
   return regex
}



module.exports = {isValidBody,isValidName,isValidEmail,isValidMobile,isValidFullName}