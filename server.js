const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const PORT = 8080;
require('dotenv').config();
const User = require('./models/Register');
const authRoute = require('./routes/auth.route.js')
const projectRoute=require('./routes/project.route.js')
const cookieParser = require('cookie-parser');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());

app.use(cors({
    origin: 'https://low-code-server.deepath.tech',
    credentials: true,
}));



mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("it will occuring the error"));

//it is for authentication
app.get('/', (req, res) => {
    res.cookie('hai', 'ajay')
    res.redirect('/api/auth/login');
});

app.use('/api/auth', authRoute)
app.use('/api/project', projectRoute);
// server.js

app.listen(8080, () => {
    console.log(`The port is running on ${PORT}`);
    console.log("http://localhost:8080");
})