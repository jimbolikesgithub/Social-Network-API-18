const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // `GET` all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    // Referencing line 55 in the User model
                    user,
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // `GET` a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                    })
            )
    }

    // `POST` a new user

    // `PUT` to update a user 

    // `DELETE` to remove user
}