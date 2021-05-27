const router = require('express').Router();
// const { Post, Comment, User } = require('../../models');
const { Post, Comment, User } = require('../models');
// const withAuth = require('../../utils/auth');
const withAuth = require('../utils/auth');

// 4 get routes

//Get all posts
router.get('/' , async (req, res) => {
    try{
        const postData = Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage' , {
            posts,
            logged_in: req.session.logged_in
        });
    }catch(err) {
        res.status(500).json(err);
    }
});

//Get 1 post by id
router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });
        res.render('post', {
            ...post, 
            logged_in: req.session.logged_in
        });
    }catch (err) {
        res.status(500).json(err);
    }

});

//get to find the user based on the session id

router.get('/profile', withAuth, async (req, res) => {
   try{
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
    });
    
    const user = userData.get({ plain: true });

    res.render('profile' , {
        ...user,
        logged_in: true
    });
} catch (err) {
    res.status(500).json(err);
}
});

//get to see if logged in
router.get('/login', (req, res)=>{
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
res.render('login');
}); 

module.exports = router;