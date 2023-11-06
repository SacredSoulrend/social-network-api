const router = require('express').Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/userController');

// Define user routes
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
