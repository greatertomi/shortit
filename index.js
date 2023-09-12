const express = require('express')
const routes = require('./routes')
const connectDB = require('./db');

const app = express();

const PORT = 4000;

connectDB();

app.use('/', routes)

app.listen(PORT, () => console.log(`Server started, listening at port ${PORT}`))

