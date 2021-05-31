const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//add withAuth back at '/' , withAuth, async after testing
router.post('/' ,  async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId
        })
        res.json(newComment);
    } catch (error) {
        res.status(500).json(error);
        
    }
    
});

module.exports = router;