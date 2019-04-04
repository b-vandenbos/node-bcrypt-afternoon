require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const auth = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');
const treasureController = require('./controllers/treasureController');

let {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));
massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
    console.log(`The database is set`);
});

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/auth/logout', authController.logout);
app.get('/api/treasure/dragon', treasureController.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureController.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureController.addMyTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureController.getAllTreasure);






app.listen(SERVER_PORT, () => console.log(`The server is listening on port ${SERVER_PORT}`));