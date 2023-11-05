const Sequelize = require('sequelize');
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
                user_id: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true
                },
                user_password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: false,
                },
                user_name: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: false
                },
                user_birth: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    unique: false
                },
                user_auth: {
                    type: Sequelize.ENUM('0', '1'),
                    allowNull: false,
                    unique: false,
                    defaultValue: 1,
                },
                user_created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    unique: false,
                    defaultValue: Sequelize.NOW
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'User',
                tableName: 'user',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }

    static associate(db) {
        db.User.hasMany(db.Board, {foreignKey: 'user', sourceKey: 'id'})
    }
};