const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    deletetThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// /api/thoughts
router.route('/:thoughtId').get(getSingleThought).delete(deletetThought);

module.exports = router;
