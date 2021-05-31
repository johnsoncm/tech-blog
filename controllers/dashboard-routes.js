
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// 3 get routes

//get all posts associated with the logged-in user
router.get('/dashboard' , withAuth, (req, res) => {
    Post.findAll({
        where:{
            user_id: req.session.user_id,
        },
        attributes: ["id", "title", "body", "user_id"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["name"],
            },
            {model: Comment,
            as: "comments",
        attributes: ["id", "comment_text", "user_id"],
    include: [
        {
            model: User,
            as: "user",
            attributes: ["name"],
        },
    ],
},
        ],
    })

})
.then((dbPostData)=> {
    if (!dbPostData) {
        res.status(404).json({message: "No such post available"});
        return;
    }
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("dashboard", {posts, loggedIn: req.session.loggedIn});
})
.catch((error) => {
    console.logs(error);
    res.status(500).json(error);
})

//get a post to edit



module.exports = router;