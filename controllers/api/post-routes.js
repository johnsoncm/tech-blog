const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// post, put, delete

router.post('/' , withAuth, async (req, res) => {
    const body = req.body
    try {
        const newPost = await Post.create({
            ...body,
            userId: req.session.userId,
        })
        res.json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/', withAuth, async (req, res) =>{

});

router.delete('/')