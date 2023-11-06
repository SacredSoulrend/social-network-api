const router = require('express').Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../../controllers/userController');

// Define user routes
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
