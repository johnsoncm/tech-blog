const { Post } = require('../models');

const postdata = [

{
    "title": "ORM",
    "content": "lorum ipsum",
    "date": 5312021

}

];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;