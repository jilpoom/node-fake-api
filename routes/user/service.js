const User = require('../../models').User;
const bcryptUtil = require('../../util/bcrypt_util');
const jwtUtil = require('../../util/jwt_util');
const dateUtil = require('../../util/datetime_util');
const redisClient = require('../../middlewares/redis-con');

const { where } = require("sequelize");


const findAllUser = (req, res, next) => {

    User.findAll({
            where: {
                delete_yn: 'N'
            }
        })
        .then(users => {
            if (users.length === 0) throw ("사용자가 존재하지 않습니다.");
            let data = []
            users.forEach(user => data.push(user.dataValues))
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        })
}

const findUserById = (req, res, next) => {
    const id = req.params.id;
    User.findOne({
            where: {
                id: id,
            }
        })
        .then(user => {
            if (user === null) throw new Error("해당 ID의 사용자가 존재하지 않습니다.");
            res.status(200).json(user);
        })
        .catch(err => res.status(400).json({ message: err.message }))
}

const insertUser = async (req, res, next) => {
    const insert_data = req.body;

    insert_data['password'] = await bcryptUtil.HashPassword(insert_data['password']);

    User.create(insert_data)
        .then(user => res.json(user.dataValues))
        .catch(err => res.json({ message: err.message}));
}

const updateUser = (req, res, next) => {
    const id = req.params.id;
    const update_data = req.body;

    User.update(update_data, {
            where: {
                id: id,
            }
        })
        .then((affected_object) => {
            if (affected_object[0] === 0) throw new Error("변경된 사항이 없습니다.");
            res.json({ affected_row: affected_object[1], message: "사용자 정보를 변경했습니다.", user_id: parseInt(id) });
        })
        .catch(err => res.json({ message: err.message, error: err.name }));
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;
    const user_data = req.body;

    user_data.delete_yn = 'Y';
    user_data.delete_date = dateUtil.getCurrentDate();

    User.update(user_data, {
            where: {
                id: id,
            }
        })
        .then(affected_object => {
            if (affected_object[0] === 0) throw new Error("해당 id의 사용자가 없습니다.");
            res.status(200).json({ message: "사용자를 삭제했습니다.", id: id })
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        if (user === null) throw new Error(`해당 email의 사용자가 없습니다. email: ${email}`);

        const hashed_password = user.dataValues.password;
        const result = await bcryptUtil.CheckHashedPassword(password, hashed_password);

        if (!result) throw ("비밀번호가 틀렸습니다.");

        const accessToken = await jwtUtil.ProvideToken(user, "access");
        const refreshToken = await jwtUtil.ProvideToken({}, "refresh");

        //Redis에 사용자 아이디와 함께 refresh token 저장
        redisClient.set(user.dataValues.id, refreshToken);

        res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });

    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}


const reAuthToken = async (req, res, next) => {

    try {
        const authorization = req.headers.authorization;
        const refresh_token = req.headers.refresh;

        if (!authorization || !refresh_token) throw new Error("Refresh, Access Token 모두 입력해야 합니다.")

        if (!authorization.startsWith('Bearer')) throw new Error("유효한 Access 토큰이 아닙니다.");

        let accessToken = authorization.substring(7); // Bearer 제외

        const user_data = jwtUtil.decodeToken(accessToken);

        if (user_data === null) {
            res.status(401).json({
                message: "유효한 토큰이 아닙니다."
            })
            return;
        }

        const access_decode = await jwtUtil.VerifyToken(authorization.substring(7));
        const refresh_decode = await jwtUtil.VerifyToken(refresh_token);
        if (access_decode == null || refresh_decode == null) throw new Error("유효한 토큰이 아닙니다.");

        // 모든 토큰이 만료되었을 경우
        if (access_decode.message === 'jwt expired' && refresh_decode.message === 'jwt expired') {
            res.status(400).json({ message: "모든 토큰이 만료되었습니다. 다시 로그인 하세요." })
            return;
        }

        // 엑세스 토큰만 만료되었을 경우
        if (access_decode.message === 'jwt expired') {
            const new_access_token = await jwtUtil.ProvideToken(user_data, "access");
            res.status(200).json({ new_access_token: new_access_token, refresh_token: refresh_token });
            return;
        }

        // 모든 토큰이 유효할 경우
        res.status(200).json({ message: "모든 토큰이 만료되지 않았습니다." })

    } catch (e) {
        res.status(400).json({ message: e.message });
    }

}


module.exports = {
    findAllUser, findUserById, updateUser, deleteUser, insertUser, login, reAuthToken
}