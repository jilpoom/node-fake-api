const Board = require('../../models').Board
const bcryptUtil = require('../../util/bcrypt_util');
const jwtUtil = require('../../util/jwt_util');
const redisClient = require('../../middlewares/redis-con');
const dateUtil = require("../../util/datetime_util");

const findAllBoard = (req, res, next) => {
    Board.findAll({
            where: {
                delete_yn: 'N',
            }
        })
        .then(boards => {
            if (boards.length === 0) throw new Error("게시글이 존재하지 않습니다.")
            let data = []
            boards.forEach(board => data.push(board.dataValues));
            res.status(200).json(data);
        })
        .catch(e => res.status(400).json({ message: e.message }));
}

const insertBoard = (req, res, next) => {
    const insert_board = req.body;
    Board.create(insert_board)
        .then(board => {
            res.status(200).json(board)
        })
        .catch(e => res.status(400).json(e));
}

const findBoardById = (req, res, next) => {
    const id = req.params.id;
    Board.findOne({
            where: {
                id: id
            },
        })
        .then(board => {
            if (!board) throw new Error("해당 ID의 게시글이 존재하지 않습니다.");
            res.status(200).json(board)
        })
        .catch(e => res.status(400).json({ message: e.message }));
}

const updateBoard = (req, res, next) => {
    const id = req.params.id;
    const update_data = req.body;
    Board.update(update_data, {
            where: {
                id: id
            },
        })
        .then(affectedCount => {
            if (!affectedCount) throw new Error('변경된 사항이 없습니다.')
            res.status(200).json({ affectedRowCount: affectedCount, message: "게시글을 변경했습니다.", board_id: parseInt(id) });
        })
        .catch(e => res.status(400).json({ error: e.message }));
}

const deleteBoard = (req, res, next) => {
    const id = req.params.id;
    let board_data = {};
    board_data.delete_yn = 'Y';
    board_data.delete_date = dateUtil.getCurrentDate();

    Board.update(board_data, {
            where: {
                id: id,
            }
        })
        .then(affectedCount => {
            if (!affectedCount) throw new Error("해당 시퀀스의 게시글이 없습니다.");
            res.json({ message: "게시글을 삭제했습니다.", board_id: id })
        })
        .catch(err => {
            res.json({ message: err.message });
        })
}


module.exports = {
    findAllBoard, insertBoard, findBoardById, updateBoard, deleteBoard
}