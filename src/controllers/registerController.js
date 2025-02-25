const User = require('../models/userModel');

class RegisterController {
    async registerUserPage(req, res) {
        res.render('registerView');
    }

    async registerUser(req, res) {
        const { username, password } = req.body;
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).send('User already exists');
            }

            const newUser = new User({ username, password });
            await newUser.save();
            res.status(201).send('User registered successfully');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = RegisterController;