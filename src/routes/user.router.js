const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/profile/:id', userController.getUserProfile);
router.put('/image', userController.increaseSubmittedImageCount);

module.exports = router;