const Model = require('../../models');

test(" 1 + 1 == 2 ", () => {
    expect(1 + 1).toEqual(2);
})

describe('USER MODEL CRUD TEST', () => {

    test("SELECT USER", async () => {
        const user_data = await Model.User.findAll();
        console.log(user_data);
    })

    test("INSERT USER", () => {
        const dummy_user = {
            user_id: 'test_user',
            user_name: 'test_username',
            user_age: 20,
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

