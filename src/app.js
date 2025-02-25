const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const LoginController = require('./controllers/loginController');
const loginRoutes = require('./routes/loginRoutes');
const adminRoutes = require('./routes/adminRoutes');
const messageRoutes = require('./routes/messageRoutes');
const registerRoutes = require('./routes/registerRoutes'); // Add this line
const User = require('./models/userModel'); // Ensure the User model is loaded

const app = express();
const PORT = process.env.PORT || 3000;
const loginController = new LoginController();

mongoose.connect('mongodb://db:27017/usermessages', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');
    
    // Ensure the database and a collection are created
    const db = mongoose.connection;
    const collection = db.collection('initCollection');
    await collection.insertOne({ init: true });
    console.log('Database and collection ensured');

    // Check if the default admin user exists, if not, create it
    const defaultAdminUsername = 'visheeths';
    const defaultAdminPassword = 'visheeths';
    const adminUser = await User.findOne({ username: defaultAdminUsername });
    if (!adminUser) {
        const newAdminUser = new User({ username: defaultAdminUsername, password: defaultAdminPassword, role: 'admin' });
        await newAdminUser.save();
        console.log('Default admin user created');
    } else {
        console.log('Default admin user already exists');
    }
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Set the views directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies
app.use(loginController.sessionMiddleware); // Use session middleware

app.use('/', loginRoutes);
app.use('/', adminRoutes);
app.use('/', messageRoutes); // Use message routes
app.use('/', registerRoutes); // Add this line

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});