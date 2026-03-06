// Model associations
const User = require('./userModel');
const Board = require('./boardModel');
const Column = require('./columnModel');
const Card = require('./cardModel');
const Tag = require('./tagModel');
const Comment = require('./commentModel');

// User associations
User.hasMany(Board, { foreignKey: 'userId', as: 'boards' });

// Board associations
Board.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
Board.hasMany(Column, { foreignKey: 'boardId', as: 'columns' });

// Column associations
Column.belongsTo(Board, { foreignKey: 'boardId', as: 'board' });
Column.hasMany(Card, { foreignKey: 'columnId', as: 'cards' });

// Card associations
Card.belongsTo(Column, { foreignKey: 'columnId', as: 'column' });
Card.hasMany(Comment, { foreignKey: 'cardId', as: 'comments' });

// Comment associations
Comment.belongsTo(Card, { foreignKey: 'cardId', as: 'card' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Many-to-many: Card <-> Tag
Card.belongsToMany(Tag, {
    through: 'card_tags',
    foreignKey: 'cardId',
    otherKey: 'tagId',
    as: 'tags'
});

Tag.belongsToMany(Card, {
    through: 'card_tags',
    foreignKey: 'tagId',
    otherKey: 'cardId',
    as: 'cards'
});

module.exports = {
    User,
    Board,
    Column,
    Card,
    Tag,
    Comment
};