const session = require('express-session');
const User = require('../models/userModel');
const Message = require('../models/messageModel'); // Assuming Message model is required

class LoginController {
    constructor() {
        this.sessionMiddleware = session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false } // Set to true if using HTTPS
        });
    }

    async loginUser(req, res) {
        const { username, password } = req.body;
        try {
            // Check if the user already has a session
            if (req.session.user) {
                const userMessages = await Message.find({ receiver: req.session.user._id }).populate('sender');
                const groupMessages = await Message.find({ group: { $in: req.session.user.groups } }).populate('sender group');
                const messages = userMessages.concat(groupMessages);
                const isAdmin = req.session.user.role === 'admin'; // Check if the user is an admin
                return res.render('welcomeView', { username: req.session.user.username, messages, isAdmin });
            }

            console.log('username :', username);
            console.log('password :', password);
            console.log(' req.body :', req.body);
            const user = await User.findOne({ username });
            if (user && await user.comparePassword(password)) {
                req.session.user = { username, _id: user._id, groups: user.groups, role: user.role }; // Ensure _id and groups are stored in session
                const userMessages = await Message.find({ receiver: req.session.user._id }).populate('sender');
                const groupMessages = await Message.find({ group: { $in: req.session.user.groups } }).populate('sender group');
                const messages = userMessages.concat(groupMessages);
                const isAdmin = user.role === 'admin'; // Check if the user is an admin
                res.render('welcomeView', { username: req.session.user.username, messages, isAdmin });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    async loginUserPage(req, res) {
        if (req.session.user) {
            const userMessages = await Message.find({ receiver: req.session.user._id }).populate('sender');
            const groupMessages = await Message.find({ group: { $in: req.session.user.groups } }).populate('sender group');
            const messages = userMessages.concat(groupMessages);
            const isAdmin = req.session.user.role === 'admin'; // Check if the user is an admin
            return res.render('welcomeView', { username: req.session.user.username, messages, isAdmin });
        }
        res.render('loginView');
    }

    async logoutUser(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Logout failed');
            }
            res.status(200).send('Logout successful');
        });
    }
}

module.exports = LoginController;