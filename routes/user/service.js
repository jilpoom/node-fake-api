const Model = require('../../models');
const {where} = require("sequelize");
const User = Model.User;

const findAllUser = (req, res, next) => {
    User.findAll()
        .then(users => {
            if(!users) throw new Error("사용자가 존재하지 않습니다.");
            let data = []
            users.forEach(user => data.push(user.dataValues))
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err.message , error: "USER_UNFOUNDED_EXCEPTION" });
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
            if(!user) throw new Error("해당 ID의 사용자가 존재하지 않습니다.");
            res.json(user)
        })
        .catch(err => res.json({ message: err.message , error: "USER_UNFOUNDED_EXCEPTION" }))
}

const insertUser = (req, res, next) => {
    const insert_data = req.body;
    User.create(insert_data)
        .then(r => res.json(r.dataValues))
        .catch(err => res.json({message: err.message , error: err.name}));
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
        .catch(err => res.json({message: "사용자를 변경할 수 없습니다.", error: err.name, err_message: err.message }));
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;

    User.destroy({
        where: {
            id: id
        }
    })
        .then(r => {
            if(r === 0) throw new Error("해당 id의 사용자가 없습니다.");
            res.json({message: "사용자를 삭제했습니다.", user_id: id})
        })
        .catch(err => {
            res.json({message: "사용자를 삭제할 수 없습니다.", error: err.name, err_message: err.message});
        })
}

module.exports = {
    findAllUser, findUserById, updateUser, deleteUser, insertUser
}