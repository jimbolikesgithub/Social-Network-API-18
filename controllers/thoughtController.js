const { User, Thought } = require('../models');

module.exports = {
    // `GET` to get all thoughts
    getThought(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
    },
    // `GET` a single user by its `_id` and populated thought and friend data
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    // `POST` a new user
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    // `PUT` to update a user 

    // `DELETE` to remove user
    deletetThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then(() => res.json({ message: 'Course and students deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
    // `POST` to add a new friend to a user's friend list
    
    // `DELETE` to remove a friend from a user's friend list
}

