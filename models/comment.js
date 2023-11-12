const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '사용자 고유 아이디',
                },
                board_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '댓글 고유 아이디',
                },
                content: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    unique: false,
                    comment: '댓글 내용',
                },
                reg_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    unique: false,
                    defaultValue: Sequelize.NOW,
                    comment: '댓글 등록 일자',
                },
                delete_yn: {
                    type: Sequelize.ENUM('Y', 'N'),
                    allowNull: false,
                    unique: false,
                    defaultValue: 'N',
                    comment: '댓글 삭제 여부',
                },
                delete_date: {
                    type: Sequelize.DATEONLY,
                    allowNull: true,
                    unique: false,
                    comment: '댓글 삭제 일자',
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Comment',
                tableName: 'comment',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'})
        db.Comment.belongsTo(db.Board, {foreignKey: 'board_id', targetKey: 'id'})
    }
};