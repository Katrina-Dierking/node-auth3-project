const express = require('express');

require('dotenv').config();
console.log(process.env.JWT_SECRET);

const apiRouter = require('./api/api-router');
const usersRouter = require('./users/users-router');

const server = express();

server.use(express.json());


server.use('/api', apiRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send("Is this thing on???")
});

module.exports = server;
