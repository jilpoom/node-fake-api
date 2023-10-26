const Model = require('../../models');
const dotenv = require('dotenv');
const bcryptUtil = require('../../util/bcrypt_util');
dotenv.config();

const salt_rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

test(" 1 + 1 == 2 ", () => {
    expect(1 + 1).toEqual(2);
})

describe('USER MODEL CRUD TEST', () => {

    test("SELECT USER", async () => {
        const user_data = await Model.User.findAll();
        console.log(user_data);
    })

    test("INSERT USER", async () => {
        const hash_password = await bcryptUtil.HashPassword("1111");
        console.log(hash_password);

        const dummy_user = {
            user_id: 'test_user',
            user_name: 'test_username',
            user_age: 20,
            user_password: hash_password,
            user_auth: 9,
        }

        Model.User.create(dummy_user);
    })

    test("DELETE USER", () => {
        const dummy_user_id = 1;

        Model.User.destroy({
            where: {id: dummy_user_id},
        })
    })

})

describe('USER HASHED PASSWORD TEST', () => {
    test('COMPARE WITH HASHED PASSWORD', async () => {
        const user_password = "1111"
        const db_hashed_password = await bcryptUtil.HashPassword(user_password);
        const result = await bcryptUtil.CheckHashedPassword(user_password, db_hashed_password);
        console.log(`hashed_password: ${user_password}`);
        console.log(`db_hashed_password: ${db_hashed_password}`);
        console.log(`result: ${result}`);
    })
})