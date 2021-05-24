const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// post, put, delete routes

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
    try{
        const postData = await Post.update(
            { post_name: req.body.post_name },
            { returning: true, where: {id: req.params.id }}
        
        )
        res.status(200).json(postData)
    } catch(err){
        res.status(500).json(err);
    }

});

router.delete('/:id', withAuth, async(req, res) =>{
    try{
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.use_id,
            },
        });

        if(!postData) {
            res.status(404).json({ message: 'No post found with this id! '});
            return;
        }
        res.status(200).json(postData);
    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;