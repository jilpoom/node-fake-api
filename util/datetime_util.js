const date = new Date();

const getCurrentDate = () => {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

module.exports = {
    getCurrentDate,
}



