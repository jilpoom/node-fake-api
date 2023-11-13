const express = require('express');
const router = express.Router();
const { validate } = require('../../middlewares/validate');
const { CheckBoard } = require('../../models/validator/board_validator');
const TokenInterceptor = require('../../middlewares/token_interceptor');

const BoardService = require('./service');

router.get('/', TokenInterceptor, BoardService.findAllBoard);

router.get('/:id', TokenInterceptor, BoardService.findBoardById);

router.post('/:id', TokenInterceptor, validate(CheckBoard), BoardService.insertBoard);

router.patch('/:id', TokenInterceptor, BoardService.updateBoard);

router.delete('/:id', TokenInterceptor, BoardService.deleteBoard);

module.exports = router;