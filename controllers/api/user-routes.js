const router = require('express').Router();
const { User } = require('../../models');

// 3 post routes

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(()=>{
            req.session.userId = newUser.id;
            req.session.userName = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser);
        })
    } catch (error) {
        res.status(400).json(error);
        
    }
});

//login
router.post('/login' , async (req, res) =>{
    try{
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again!!' });
                return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again!!' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });

    }   catch (err) {
        res.status(400).json(err);
    }
})



//logout

router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() =>{
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;