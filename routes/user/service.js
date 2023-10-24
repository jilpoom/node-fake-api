const Model = require('../../models');
const {where} = require("sequelize");
const User = Model.User;


const findAllUser = async () => {
    const users = await User.findAll();
    let data = []
    users.forEach(user => data.push(user.dataValues));
    return data;
}


const findUserById = async (id) => {
    const user = await User.findOne({
        where: {
            id: id,
        }
    });
    return user ? user.dataValues : { message: "사용자가 없습니다."};
}

const insertUser = async (insert_data) => {
    const insertedUser = await User.create(insert_data);
    return insertedUser;
}

const updateUser = async (id, update_data) => {
     const isUpdate = await User.update(update_data, {
        where: {
            id: id,
        }
    });

     const updatedUser  = await findUserById(id);

    return updatedUser;
}

const deleteUser = (id) => {
    const user = findUserById(id);

    User.destroy({
        where: {
            id: id
        }
    })

    return { message: "사용자가 삭제되었습니다." };
}

module.exports = {
    findAllUser, findUserById, updateUser, deleteUser, insertUser
}