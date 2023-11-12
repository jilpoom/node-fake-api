const Sequelize = require('sequelize');

module.exports = class BoardFile extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '게시글 고유 아이디',
                },
                board_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '게시글 고유 아이디',
                },
                uuid: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '파일 UUID',
                },
                file_name: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '파일 이름',
                },
                upload_path: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    comment: '파일 업로드 경로'
                },
                delete_yn: {
                    type: Sequelize.ENUM('Y', 'N'),
                    allowNull: false,
                    unique: false,
                    defaultValue: 'N',
                    comment: '파일 삭제 여부',
                },
                delete_date: {
                    type: Sequelize.DATEONLY,
                    allowNull: true,
                    unique: false,
                    comment: '파일 삭제 일자',
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'BoardFile',
                tableName: 'board_file',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }

    static associate(db) {
        db.BoardFile.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'})
        db.BoardFile.belongsTo(db.Board, {foreignKey: 'board_id', targetKey: 'id'})
    }
};