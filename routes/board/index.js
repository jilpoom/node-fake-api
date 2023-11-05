const express = require('express');
const router = express.Router();

const TokenInterceptor = require('../../middlewares/token_interceptor');

const BoardService = require('./service');

router.get('/', TokenInterceptor, BoardService.findAllBoard);

router.get('/:id', TokenInterceptor, BoardService.findBoardById);

router.post('/:id', TokenInterceptor, BoardService.insertBoard);

router.put('/:id', TokenInterceptor, BoardService.updateBoard);

router.delete('/:id', TokenInterceptor,BoardService.deleteBoard);

module.exports = router;