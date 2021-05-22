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


//logout