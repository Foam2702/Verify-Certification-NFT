const formatDate = (dateStr) => {
    const [month, day, year] = dateStr.split("/");
    console.log(month)
    console.log(day)
    console.log(year)
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
module.exports = formatDate