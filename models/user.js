const Sequelize = require('sequelize');
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
                email: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                    comment: '사용자 이메일 겸 아이디'
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: false,
                    comment: '사용자 비밀번호',
                },
                name: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: false,
                    comment: '사용자 이름'
                },
                birth: {
                    type: Sequelize.DATEONLY,
                    allowNull: false,
                    unique: false,
                    comment: '사용자 생년월일'
                },
                auth: {
                    type: Sequelize.ENUM('0', '1'),
                    allowNull: false,
                    unique: false,
                    defaultValue: '0',
                    comment: '사용자 권한, 사용자: 0, 관리자: 1',
                },
                created_at: {
                    type: Sequelize.DATEONLY,
                    allowNull: false,
                    unique: false,
                    defaultValue: Sequelize.NOW,
                    comment: '사용자 등록일자',
                },
                delete_yn: {
                    type: Sequelize.ENUM('Y', 'N'),
                    allowNull: false,
                    unique: false,
                    defaultValue: 'N',
                    comment: '사용자 삭제 여부'
                },
                delete_date: {
                    type: Sequelize.DATEONLY,
                    allowNull: true,
                    unique: false,
                    comment: "사용자 삭제 일자"
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
        db.User.hasMany(db.Board, {foreignKey: 'user_id', sourceKey: 'id'});
        db.User.hasMany(db.Comment, {foreignKey: 'user_id', sourceKey: 'id'});
    }
};