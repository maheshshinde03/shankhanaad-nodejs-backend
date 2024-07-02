const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();

app.use(express.json());

const corsOptions = {
    origin: 'https://www.shankhanaadtrust.com', // Your frontend domain
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//app.use(express.static('upload'));


const usesrRouter = require('./routes/users');
const adminRouter = require('./routes/admin')

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', usesrRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
