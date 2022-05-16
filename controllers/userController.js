const { User, Thought } = require('../models');

module.exports = {
    // `GET` all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    // Referencing line 55 in the User model
                    users,
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // `GET` a single user by its `_id` and populated thought and friend data
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
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // `POST` a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // `PUT` to update a user 
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // `DELETE` to remove user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No such student exists' })
                    : Thought.findOneAndUpdate(
                        { students: req.params.userId },
                        // The `$pull` operator removes from an existing array all instances of a value or values that match a specified condition
                        { $pull: { students: req.params.studentId } },
                        // If new is true : the modified document if the query returns a match
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'User deleted, but no thoughts found',
                      })
                    : res.json({ message: 'User successfully deleted '})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // `POST` to add a new friend to a user's friend list
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.paramsuserId },
            { $addToSet: { assignments: req.body } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // `DELETE` to remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.studentId },
            { $pull: { assignment: { assignmentId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};