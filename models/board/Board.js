const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
                user: {
                    type: Sequelize.INTEGER
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: false
                },
                body: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                    unique: false
                },
                reg_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    unique: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Board',
                tableName: 'tbl_board',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }
    static associate(db) {
        db.Board.belongsTo(db.User, { foreignKey: 'user', targetKey: 'id' })
    }
};