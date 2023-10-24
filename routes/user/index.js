const express = require('express');
const router = express.Router();

const UserService = require('./service');

router.get('/', async function(req, res, next) {
    const users = await UserService.findAllUser();
    res.json(users);
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const user = await UserService.findUserById(id);
    res.json(user);
})

router.post("/", (req, res, next) => {
    const insert_data = req.body;
    const message = UserService.insertUser(insert_data);
})


router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const user = await UserService.updateUser(id, data);
    res.json(user);
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const message = UserService.deleteUser(id);
    res.json(message);
})


module.exports = router;