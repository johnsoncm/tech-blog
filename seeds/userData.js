const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = [

    {
        "name": "Casey",
        "email": "test@test.com",
        "password": "password244"
    
    }
    
    ]

    const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

    module.exports = seedUsers;