const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    deletetThought
} = require('../../controllers/thoughtController');

// /api/thought
// GET WORKS
// POST WORKS
router.route('/').get(getThought).post(createThought);

// /api/thought
// GET WORKS
// DELETE WORKS
// -- DONE --
router.route('/:thoughtId').get(getSingleThought).delete(deletetThought);

module.exports = router;

// DONE