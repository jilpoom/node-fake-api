const express = require('express');
const router = express.Router();
const { validate } = require('../../middlewares/validate');
const { CheckComment } = require('../../models/validator/comment_validator');
const TokenInterceptor = require('../../middlewares/token_interceptor');

const CommentService = require('./service');

router.get('/', TokenInterceptor, CommentService.findAllComment);

router.get('/:id', TokenInterceptor, CommentService.findCommentById);

router.get('/user/:id', TokenInterceptor, CommentService.findAllCommentByUserId);

router.get('/board/:id', TokenInterceptor, CommentService.findAllCommentByBoardId);

router.post('/:id', TokenInterceptor, validate(CheckComment), CommentService.insertComment);

router.patch('/:id', TokenInterceptor, CommentService.updateComment);


router.delete('/:id', TokenInterceptor, CommentService.deleteComment);

module.exports = router;