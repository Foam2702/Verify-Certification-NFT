function splitDate(str) {
    const newStr = str.split('/');
    const result = `${newStr[2]}-${newStr[1]}-${newStr[0]}`;
    return result

}
module.exports = splitDate;