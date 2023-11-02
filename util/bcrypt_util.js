const bcrypt = require('bcrypt');
require('dotenv').config();
const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS);

/**
 * @param {String} password 사용자가 입력한 비밀번호
 * */
const HashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        })
    })
}

/**
 * @param {String} password 사용자가 입력한 비밀번호
 * @param {String} hash_password DB에 저장된 해싱 문자열
 * */
const CheckHashedPassword = (password, hash_password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash_password, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}


module.exports = {
    HashPassword, CheckHashedPassword
}