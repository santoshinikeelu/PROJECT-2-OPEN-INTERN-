const isValid = function (value, type) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value != type) return false
    return true;
}
const isValidName = function (value, type) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && (value.trim().length === 0 || value.trim().split(" ").length > 1)) return false
    if (typeof value != type) return false
    return true;
}

//function for request body validation
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0    // true or false
}