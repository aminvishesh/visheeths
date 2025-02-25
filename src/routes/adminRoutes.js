const express = require('express');
const User = require('../models/userModel');
const Group = require('../models/groupModel');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', isAdmin, (req, res) => {
    res.render('adminDashboard');
});

router.post('/create-user', isAdmin, async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating user');
    }
});

router.post('/create-group', isAdmin, async (req, res) => {
    const { name } = req.body;
    try {
        const newGroup = new Group({ name });
        await newGroup.save();
        res.status(201).send('Group created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating group');
    }
});

router.post('/add-user-to-group', isAdmin, async (req, res) => {
    const { userId, groupId } = req.body;
    try {
        const user = await User.findOne({ _id: userId });
        const group = await Group.findOne({ _id: groupId });
        if (user && group) {
            group.members.push(user);
            user.groups.push(group);
            await group.save();
            await user.save();
            res.status(200).send('User added to group successfully');
        } else {
            res.status(404).send('User or group not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding user to group');
    }
});

module.exports = router;