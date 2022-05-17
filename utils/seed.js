const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected');

    // Drop existing courses
    await Thought.deleteMany({});

    // Drop existing students
    await User.deleteMany({});

    // Create empty array to hold the students
    const users = [];

    for (let i = 0; i < 20; i++) {
        const reactions = getRandomReactions();
        
        const username = getRandomUsername();
        const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`

        users.push({
            username,
            email,
            reactions,
        });
    }

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // Add thoughts to the collection and await the results
    await Thought.collection.insertOne({
        thoughtText: '[REDACTED]',
    });

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})