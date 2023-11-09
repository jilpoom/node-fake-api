const date = new Date();

const getCurrentDate = () => {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

module.exports = {
    getCurrentDate,
}



