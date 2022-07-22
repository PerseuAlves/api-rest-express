const express = require('express');
const dotenv = require('dotenv');

// database
const mongoose = require('mongoose');

// load .env data
dotenv.config();

// app core
const app = express();
const PORT = 3000;

// JSON
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to MongoDB')
        app.emit('connected');
    }).catch(e => {
        console.log(e);
    });

// routes
const userRoutes = require('./routes/userRouter');

app.use('/users', userRoutes);

// port
app.on('connected', () => {
    app.listen(PORT, () => {
        console.log(`server running on port: http://localhost:${PORT}`);
    });
})