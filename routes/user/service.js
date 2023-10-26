const User = require('../../models').User;
const bcryptUtil = require('../../util/bcrypt_util');
const jwtUtil = require('../../util/jwt_util');
const {where} = require("sequelize");


const findAllUser = (req, res, next) => {
    User.findAll()
        .then(users => {
            if (!users) throw new Error("사용자가 존재하지 않습니다.");
            let data = []
            users.forEach(user => data.push(user.dataValues))
            res.json(data)
        })
        .catch(err => {
            res.json({message: err.message, error: "USER_UNFOUNDED_EXCEPTION"});
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
            if (!user) throw new Error("해당 ID의 사용자가 존재하지 않습니다.");
            res.json(user)
        })
        .catch(err => res.json({message: err.message, error: "USER_UNFOUNDED_EXCEPTION"}))
}

const insertUser = async (req, res, next) => {
    const insert_data = req.body;
    insert_data['user_password'] = await bcryptUtil.HashPassword(insert_data['user_password']);
    User.create(insert_data)
        .then(user => res.json(user.dataValues))
        .catch(err => res.json({message: err.message, error: err.name}));
}

const updateUser = (req, res, next) => {
    const id = req.params.id;
    const update_data = req.body;
    User.update(update_data, {
        where: {
            id: id,
        }
    })
        .then((affectedCount) => {
            if (affectedCount[0] === 0) throw new Error("변경된 사항이 없습니다.");
            res.json({affectedRowCount: affectedCount, message: "사용자 정보를 변경했습니다.", user_id: parseInt(id)});
        })
        .catch(err => res.json({message: err.message, error: err.name}));
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;

    User.destroy({
        where: {
            id: id
        }
    })
        .then(r => {
            if (r === 0) throw new Error("해당 id의 사용자가 없습니다.");
            res.json({message: "사용자를 삭제했습니다.", user_id: id})
        })
        .catch(err => {
            res.json({message: err.message, error: err.name});
        })
}

const login = async (req, res, next) => {
    const {user_id, user_password} = req.body;
    try {
        const user = await User.findOne({
            where: {
                user_id: user_id,
            }
        })
        if (!user) throw new Error("사용자가 없습니다.");

        const hashed_password = user.dataValues.user_password;
        const result = await bcryptUtil.CheckHashedPassword(user_password, hashed_password);

        if (!result) throw new Error("비밀번호가 틀렸습니다.");

        //TODO: JWT ACCESS TOKEN, REFRESH TOKEN 생성 로직 구현
        const accessToken = await jwtUtil.ProvideToken(user, "access");
        const refreshToken = await jwtUtil.ProvideToken({}, "refresh");
        res.json({access_token: accessToken, refresh_token: refreshToken});

    } catch (e) {
        res.json({message: e.message, name: e.name});
    }
}

module.exports = {
    findAllUser, findUserById, updateUser, deleteUser, insertUser, login,
}