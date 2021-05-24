const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');
const { Model } = require('sequelize/types');

router.use('/users' , userRoutse);
router.use('/comments' , commentRoutes);
router.use('/posts' , postRoutes);

module.exports = router;