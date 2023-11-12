const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '사용자 고유 아이디',
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                    unique: false,
                    comment: '게시글 제목',
                },
                subtitle: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: false,
                    comment: '게시글 부제목',
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                    unique: false,
                    comment: '게시글 내용',
                },
                thumbnail: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                    unique: false,
                    comment: '게시글 섬네일',
                },
                views: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: false,
                    defaultValue: 0,
                    comment: '게시글 조회수',
                },
                reg_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    unique: false,
                    defaultValue: Sequelize.NOW,
                    comment: '게시글 등록일자',
                },
                tag: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: false,
                    comment: '게시글 태그',
                },
                delete_yn: {
                    type: Sequelize.ENUM('Y', 'N'),
                    allowNull: false,
                    unique: false,
                    defaultValue: 'N',
                    comment: '게시글 삭제 여부',
                },
                delete_date: {
                    type: Sequelize.DATEONLY,
                    allowNull: true,
                    unique: false,
                    comment: '게시글 삭제 일자',
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Board',
                tableName: 'board',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }

    static associate(db) {
        db.Board.hasMany(db.BoardFile, {foreignKey: 'board_id', sourceKey: 'id'});
        db.Board.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});
    }
};