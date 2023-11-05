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
                subtitle: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: false
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                    unique: false
                },
                thumbnail: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                    unique: false,
                },
                views: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: false,
                    defaultValue: 0,
                },
                reg_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    unique: false,
                    defaultValue: Sequelize.NOW,
                },
                tag: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: false,
                }
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