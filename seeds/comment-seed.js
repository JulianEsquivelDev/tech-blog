// require Comment class from models directory
const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 5,
        comment_text: "This is so Cool!"
    },
    {
        user_id: 4,
        post_id: 4,
        comment_text: "Great work team!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "Keep up the good work!"
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "I love this new feature"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "You got this!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "Beautiful interface"
    },
    {
        user_id: 5,
        post_id: 3,
        comment_text: "I like the colors"
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "Good work team!"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

