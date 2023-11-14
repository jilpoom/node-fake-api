const BoardFile = require('../../models').BoardFile
const bcryptUtil = require('../../util/bcrypt_util');
const jwtUtil = require('../../util/jwt_util');
const redisClient = require('../../middlewares/redis-con');
const dateUtil = require("../../util/datetime_util");
const { Board } = require("../../models");


const findAllBoardFile = (req, res, next) => {
    BoardFile.findAll({
        where: {
            delete_yn: 'N',
        }
    }).then(boardfiles => {
            if (boardfiles.length === 0) throw new Error("해당 첨부 파일이 존재하지 않습니다.")
            let data = []
            boardfiles.forEach(boardfile => data.push(boardfile.dataValues));
            res.status(200).json(data);
        })
        .catch(e => res.status(400).json({ message: e.message }));
}

const findBoardFileById = (req, res, next) => {
    const id = req.params.id;

    BoardFile.findOne({
        where: {
            id: id
        }
    }).then(boardfile => {
            if (boardfile === null) throw new Error("해당 ID의 첨부 파일이 존재하지 않습니다.");
            res.status(200).json(boardfile)
        })
        .catch(e => res.status(400).json({ message: e.message }));
}


// TODO: 파일 객체 기준으로 입력, 삭제, 수정 정의
const insertBoardFile = (req, res, next) => {
    const insert_board = req.files[0];

    Board.create(insert_board)
        .then(board => {
            res.status(200).json(board)
        })
        .catch(e => res.status(400).json(e));
}

const updateBoardFile = (req, res, next) => {

}

const deleteBoardFile = (req, res, next) => {

}


module.exports = {
    findAllBoardFile, findBoardFileById, insertBoardFile, updateBoardFile, deleteBoardFile
}