const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

/* DATABASE MODEL */
const User = require('./user');
const Board = require('./board');
const Comment = require('./comment');
const BoardFile = require('./board_file');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Board = Board;
db.Comment = Comment;
db.BoardFile = BoardFile;

User.init(sequelize);
Board.init(sequelize);
Comment.init(sequelize);
BoardFile.init(sequelize);

User.associate(db);
Board.associate(db);
Comment.associate(db);
BoardFile.associate(db);

module.exports = db;