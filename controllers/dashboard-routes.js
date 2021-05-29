
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// 3 get routes

//get all posts associated with the logged-in user
router.get('/' , withAuth, (req, res) => {

})

//get a post to edit

module.exports = router;