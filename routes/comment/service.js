const Comment = require('../../models').Comment;
const bcryptUtil = require('../../util/bcrypt_util');
const jwtUtil = require('../../util/jwt_util');
const redisClient = require('../../middlewares/redis-con');
const dateUtil = require("../../util/datetime_util");
const { getCurrentDate } = require("../../util/datetime_util");

const findAllComment = (req, res, next) => {
    Comment.findAll({
            where: {
                delete_yn: 'N'
            }
        }
    ).then(comments => {
        if (comments.length === 0) throw new Error("작성된 댓글이 없습니다.")
        let data = [];
        comments.forEach(comment => data.push(comment.dataValues))
        res.status(200).json(data);
    }).catch(e => {
        res.status(400).json({ message: e.message });
    })
}

const findCommentById = (req, res, next) => {
    const id = req.params.id;
    Comment.findOne({
        where: {
            id: id,
        }
    }).then(comment => {
        if (comment == null) new Error(`해당 사용자가 없습니다. id: ${id}`)
        res.status(200).json(comment.dataValues);
    }).catch(e => {
        res.status(400).json({ message: e.message });
    })
}

const findAllCommentByBoardId = (req, res, next) => {
    const board_id = req.params.id;

    Comment.findAll({
        where: {
            delete_yn: 'N',
            board_id: board_id,
        }
    }).then(comments => {
        let data = [];
        comments.forEach(comment => data.push(comment.dataValues))
        res.status(200).json(data);
    }).catch(e => {
        res.status(400).json({ message: e.message })
    })
}

const findAllCommentByUserId = (req, res, next) => {
    const user_id = req.params.id;

    Comment.findAll({
        where: {
            delete_yn: 'N',
            user_id: user_id,
        }
    }).then(comments => {
        let data = [];
        comments.forEach(comment => data.push(comment.dataValues))
        res.status(200).json(data);
    }).catch(e => {
        res.status(400).json({ message: e.message })
    })

}

const insertComment = (req, res, next) => {
    const insert_data = req.body;

    Comment.create(insert_data)
        .then(comment => {
            res.status(200).json(comment);
        }).catch(e => {
        res.status(400).json({ message: e.message })
    })
}

const deleteComment = (req, res, next) => {
    const id = req.params.id;

    const delete_yn = {
        delete_yn: 'Y',
        delete_data: getCurrentDate(),
    }

    Comment.update(delete_yn, {
        where: {
            id: id,
        }
    }).then(updated => {
        if (updated[0] === 0) new Error('변경된 내용이 없습니다.')
        res.status(200).json({ affectedRowCount: affectedCount, message: "댓글을 삭제했습니다.", id: parseInt(id) });
    }).catch(e => {
        res.status(400).json({ message: e.message });
    })
}

const updateComment = (req, res, next) => {
    const update_data = req.body;
    const id = req.params.id;

    Comment.update(update_data, {
        where: {
            id: id,
        }
    }).then(updated => {
        if (updated[0] === 0) new Error('변경된 내용이 없습니다.')
        res.status(200).json({ affectedRowCount: affectedCount, message: "댓글을 변경했습니다.", id: parseInt(id) });
    }).catch(e => {
        res.status(400).json({ message: e.message });
    })
}


module.exports = {
    findAllComment, findCommentById, findAllCommentByUserId, findAllCommentByBoardId, insertComment,
    deleteComment, updateComment,
}