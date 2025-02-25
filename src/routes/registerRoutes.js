const express = require('express');
const RegisterController = require('../controllers/registerController');

const router = express.Router();
const registerController = new RegisterController();

router.get('/register', (req, res) => registerController.registerUserPage(req, res));
router.post('/register', (req, res) => registerController.registerUser(req, res));

module.exports = router;