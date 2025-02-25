const express = require('express');
const User = require('../models/userModel');
const Group = require('../models/groupModel');
const Message = require('../models/messageModel');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send-message', isAuthenticated, async (req, res) => {
    const { receiver, group, content } = req.body;
    try {
        if (receiver) {
            const receiverUser = await User.findOne({ username: receiver });
            if (!receiverUser) {
                return res.status(404).send('User not found');
            }
            const newMessage = new Message({
                sender: req.session.user._id,
                receiver: receiverUser._id,
                content
            });
            await newMessage.save();
        } else if (group) {
            const groupObj = await Group.findOne({ name: group });
            if (!groupObj) {
                return res.status(404).send('Group not found');
            }
            const newMessage = new Message({
                sender: req.session.user._id,
                group: groupObj._id,
                content
            });
            await newMessage.save();
        } else {
            return res.status(400).send('Receiver or group must be specified');
        }
        res.redirect('/welcome');
    } catch (error) {
        res.status(500).send('Error sending message');
    }
});

router.get('/welcome', isAuthenticated, async (req, res) => {
    try {
        const userMessages = await Message.find({ receiver: req.session.user._id }).populate('sender');
        const groupMessages = await Message.find({ group: { $in: req.session.user.groups } }).populate('sender group');
        const messages = userMessages.concat(groupMessages);
        const isAdmin = req.session.user.role === 'admin'; // Check if the user is an admin
        res.render('welcomeView', { username: req.session.user.username, messages, isAdmin });
    } catch (error) {
        res.status(500).send('Error fetching messages');
    }
});

module.exports = router;