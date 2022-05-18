const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/user 
// GET WORKS
// POST WORKS
// PUT WORKS
router.route('/').get(getUsers).post(createUser).put(updateUser);

// /api/user/:userId
// GET WORKS
// DELETE WORKS (but no thoughts found returns unless thoughts have been added via POST or hardcode)
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/friends
// WORKS
router.route('/:userId/friends').post(addFriend);

// /api/user/:userId/friends/:friendId
// 
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;