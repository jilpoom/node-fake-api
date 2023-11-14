const multer = require('multer');
const datetime_util = require('../util/datetime_util');
const uuid = require('uuid');

exports.storage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            dir = './uploads/'
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            let time = datetime_util.getCurrentDate();
            let uuid = uuid.v4().split('-').join("");
            file.originalname = Buffer.from(file.originalname, 'utf-8').toString('utf-8');

            cb(null, `${uuid}_${time}_${file.originalname}`);
        }
    })
})