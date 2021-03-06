const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');
const { Model } = require('sequelize');


User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Post.belongsTo(User, {
    foreignKey: 'user_id'
});


User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//comment belongs to post and post has many comments

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


Post.hasMany(Comment, {
    foreignKey: 'post_id'

});

module.exports = { User, Post, Comment};