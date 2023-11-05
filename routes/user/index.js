const express = require('express');
const TokenInterceptor = require('../../middlewares/token_interceptor');
const router = express.Router();

const UserService = require('./service');

router.post('/login', UserService.login);

router.post("/signup", UserService.insertUser);

router.post("/reauth", UserService.reAuthToken);

router.get('/', TokenInterceptor, UserService.findAllUser);

router.get('/:id', TokenInterceptor, UserService.findUserById);

router.put('/:id', TokenInterceptor, UserService.updateUser);

router.delete('/:id', TokenInterceptor, UserService.deleteUser);

// :TODO User 수정 router

module.exports = router;