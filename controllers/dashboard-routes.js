
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// 3 get routes
//replace ('/dashboard' ,  withAuth, (req,res))
//get all posts associated with the logged-in user
router.get('/', (req, res) => {
    console.log('i am here')
    //PROBLEM IS BETWEEN HERE AND 
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "title", "content", "date", "userID"],
        include: [
            {
          model: Comment,
          attributes: [
              'id',
              'body',
              'user_id',
              'post_id'
          ],
          include: {
              model: User,
              attributes: ['name']
          }
            },
            {
                model: User,
                attributes: ['name']
                         
            }
        ]
       
    })
    .then((dbPostData) => {
        console.log('i am here TOO!!!!')
        if (!dbPostData) {
            res.status(404).json({ message: "No such post available" });
            return;
            
        }
        console.log(dbPostData)
         const posts = dbPostData.map((post) => post.get({ plain: true }));
        //HERE AND ALSO CONSOLE LOG MORE STUFF ABOVE
        console.log('look at this post data!!!!', posts);
        res.render('profile-dashboard', { layout: 'dashboard', posts, loggedIn: req.session.loggedIn });
  console.log('HELLO!!')
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    })

})
  

//get a post to edit



module.exports = router;