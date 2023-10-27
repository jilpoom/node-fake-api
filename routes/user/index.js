const express = require('express');
const tokenInterceptor = require('../../middlewares/token_interceptor');
const router = express.Router();

const UserService = require('./service');

router.post('/login', UserService.login);

router.post("/signup", UserService.insertUser);

router.post("/reauth", UserService.reAuthToken);

router.get('/', tokenInterceptor, UserService.findAllUser);

router.get('/:id', tokenInterceptor, UserService.findUserById);

router.put('/:id', tokenInterceptor, UserService.updateUser);

router.delete('/:id', tokenInterceptor, UserService.deleteUser);

module.exports = router;