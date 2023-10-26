const express = require('express');
const router = express.Router();

const UserService = require('./service');

router.get('/', UserService.findAllUser);

router.get('/:id', UserService.findUserById);

router.post('/login', UserService.login);

router.post("/signup", UserService.insertUser);

router.put('/:id', UserService.updateUser);

router.delete('/:id', UserService.deleteUser);

module.exports = router;