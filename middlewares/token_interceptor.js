const jwtUtil = require('../util/jwt_util');
require('dotenv').config();

const tokenValidator = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        let accessToken = ""

        // authorization이 요청 헤더에 없는 경우
        if (!authorization) throw new Error("API를 사용하기 위해서는 본사에서 제공하는 토큰을 발급 받아야 합니다.");

        // authorization 키의 값이 Bearer로 시작하지 않는 경우
        if (authorization.startsWith('Bearer')) accessToken = authorization.substring(7); // Bearer 제외
        else throw new Error("유효한 토큰이 아닙니다.");

        const decode = await jwtUtil.VerifyToken(accessToken);

        if (decode) {
            next();
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

}

module.exports = tokenValidator;