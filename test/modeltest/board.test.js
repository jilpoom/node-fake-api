const Model = require('../../models');
const dotenv = require('dotenv');
const bcryptUtil = require('../../util/bcrypt_util');
const { deserialize } = require("mongodb");
const UUID = require('uuid');
dotenv.config();


// TODO: expect 문으로 다시 작성하기
describe('BOARD MODEL CRUD TEST', () => {
    test("SELECT BOARDS", async () => {
        const board_data = await Model.Board.findAll();
        console.log(board_data);
    })

    test('UPDATE BOARD', async () => {
        const hash_password = await bcryptUtil.HashPassword('1111');

        const dummy_user = {
            id: 'test_user' + UUID.v4()[2],
            name: 'test_username',
            password: hash_password,
            auth: 1,
            birth: new Date(),
        }

        const user = await Model.User.create(dummy_user);

        const board_data = {
            user: user.dataValues.id,
            title: 'new_test_board',
            subtitle: 'new_test_subtitle',
            content: 'new_test_content',
            thumbnail: '/new/thumnail/upload/path',
            tag: 'new_tag'
        }

        const board = await Model.Board.create(board_data);

        const new_board_data = {
            id: board.dataValues.id,
            user: user.dataValues.id,
            title: 'test_board',
            subtitle: 'test_subtitle',
            content: 'test_content',
            thumbnail: '/thumnail/upload/path',
            tag: 'tag'
        }

        const new_board = await Model.Board.update(new_board_data, {
            where: {
                id: new_board_data.id
            }
        })

        await Model.Board.destroy({
            where: { id: board.dataValues.id }
        });

        await Model.User.destroy({
            where: { id: user.dataValues.id },
        });
    })

    test("INSERT AND DELETE BOARD", async () => {
        const hash_password = await bcryptUtil.HashPassword('1111');

        const dummy_user = {
            id: 'test_user' + UUID.v4()[2],
            name: 'test_username',
            age: 20,
            password: hash_password,
            auth: 1,
            birth: new Date(),
        }

        const user = await Model.User.create(dummy_user);

        const board_data = {
            user: user.dataValues.id,
            title: 'test_board',
            subtitle: 'test_subtitle',
            content: 'test_content',
            thumbnail: '/thumnail/upload/path',
            tag: 'tag'
        }

        const board = await Model.Board.create(board_data);

        await Model.Board.destroy({
            where: { id: board.dataValues.id },
        })

        await Model.User.destroy({
            where: { id: user.dataValues.id },
        })
    })


})