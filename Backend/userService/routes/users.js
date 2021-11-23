const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/auth');

const { signInHandler, signUpHandler, putUsersHandler, forgotPasswordHandler, getUsersHandler} = require('../controllers/userController');

router.post('/login', signInHandler);
router.post('/signup', signUpHandler);
router.get('/get-all-users', getUsersHandler);
router.post('/update-a-user/:userID', verifyToken, putUsersHandler)

module.exports = router;