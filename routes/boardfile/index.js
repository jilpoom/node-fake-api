const express = require('express');
const router = express.Router();
const { validate } = require('../../middlewares/validate');
const { CheckBoardFIle } = require('../../models/validator/board_file_validator');
const TokenInterceptor = require('../../middlewares/token_interceptor');
const {storage} = require('../../middlewares/multer');

const BoardFileService = require('./service');

router.get('/', TokenInterceptor, BoardFileService.findAllBoardFile);

router.get('/:id', TokenInterceptor, BoardFileService.findBoardFileById);

router.post('/:id', TokenInterceptor, validate(CheckBoardFile), storage.array('files'), BoardFileService.insertBoardFile);

router.patch('/:id', TokenInterceptor, BoardFileService.updateBoardFile);

router.delete('/:id', TokenInterceptor, BoardFileService.deleteBoardFile);

module.exports = router;