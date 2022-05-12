const seedPosts = require('./post-seed');
const seedUsers = require('./user-seed');
const seedComments = require('./comment-seed');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');

    await seedUsers();
    console.log('--------------');

    await seedPosts();
    console.log('--------------');

    await seedComments();
    console.log('--------------');

    process.exit(0);
};

seedAll();