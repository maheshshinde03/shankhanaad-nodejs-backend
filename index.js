const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Apply CORS middleware with wildcard origin
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add logging middleware
app.use((req, res, next) => {
    console.log('Incoming request headers:', req.headers);
    next();
});

// Define routes
const usesrRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', usesrRouter);
app.use('/admin', adminRouter);

// Log response headers
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Response headers:', res.getHeaders());
    });
    next();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
