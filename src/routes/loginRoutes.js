const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();
const loginController = new LoginController();

router.get('/login', (req, res) => loginController.loginUserPage(req, res));
router.post('/login', (req, res) => loginController.loginUser(req, res));
router.get('/logout', (req, res) => loginController.logoutUser(req, res));
router.post('/logout', (req, res) => loginController.logoutUser(req, res));

module.exports = router;