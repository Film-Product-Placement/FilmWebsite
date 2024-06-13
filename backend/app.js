const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// connect db
connectDB();

// interme
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static
app.use(express.static(__dirname + '/../')); //

// route
app.use('/api/users', require('./routes/userRoutes'));

//home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html'); // path
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
