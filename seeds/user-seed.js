// require user class from models directory
const { User } = require('../models');

// data for user seeds
const userData = [
    {
        username: "martin_bour",
        twitter: "martinb",
        github: "martinb",
        email: "martin_b@gmail.com",
        password: "p@ssword1" 
    },
    {
        username: "matt_b",
        twitter: "mathewb",
        github: "mathewb",
        email: "mathew_b@gmail.com",
        password: "p@ssword2"
    },
    {
        username: "shaun_c",
        twitter: "shaun",
        github: "shaun",
        email: "shaun_c@gmail.com",
        password: "p@ssword3"
    },
    {
        username: "lee_n",
        twitter: "leenorris",
        github: "leenorris",
        email: "lee_n@gmail.com",
        password: "p@ssword4"
    },
    {
        username: "chris_r",
        twitter: "chris23",
        github: "chris23",
        email: "chris_r@gmail.com",
        password: "p@ssword5"
    },
    {
        username: "joe",
        twitter: "joe_w",
        github: "joeDev",
        email: "joe@gmail.com",
        password: "p@ssword6"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;