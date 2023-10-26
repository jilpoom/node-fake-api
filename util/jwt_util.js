const JWT = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECREY_KEY;


/** @param user_safe_data {Object} 보안이 중요하지 않은 User Payload
 *  @param token_category {String} "access", "refresh"
 *  <br>
 *  <code>"access"</code> : 30m
 *  <br>
 *  <code>"refresh"</code>: 7d
 *  <br>
 *  *리프레쉬 토큰을 발급할 시, Payload에는 user_safe_data는 빈 객체만 허용한다.: {}*
 *  */
const ProvideToken = (user_safe_data, token_category) => {
    return new Promise((resolve, reject) => {
        if (token_category === "refresh" && Object.keys(user_safe_data).length !== 0) {
            reject("리프레쉬 토큰은 Payload에 데이터를 넣을 수 없습니다.")
        }

        const expiresIn = setTokenPeriod(token_category);


        JWT.sign({user_safe_data}, JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: expiresIn,
        }, (err, token) => {
            if (err) reject(err);
            console.log(token);
            resolve(token);
        })
    })
}

const VerifyToken = (access_token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(access_token, JWT_SECRET_KEY, (err, decode) => {
            if (err) reject(err);
            resolve(decode);
        })
    })
}

/*
 * jwt_util.js 내부에서만 사용됨.
 */
const setTokenPeriod = (token_category) => {
    switch (token_category) {
        case "access":
            return '30m'
        case "refresh":
            return '7d'
    }
}

module.exports = {ProvideToken, VerifyToken}