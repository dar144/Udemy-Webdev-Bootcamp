const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport')

mongoose.connect('mongodb://localhost:27017/loginDemo', {'useNewUrlParser': true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }));
app.use(methodOverride('_method'));
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.session.user_id;
    console.log(res.locals.currentUser)
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
})

const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('login');
    }
    next();
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/login');
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login')
    }
})



app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})

app.listen(3000, () => {
    console.log("SERVING YOUR APP!")
})