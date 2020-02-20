const express = require('express');
const helmet = require ('helmet');
const cors = require ('cors')
require('dotenv').config();

console.log(process.env.JWT_SECRET);

const apiRouter = require('./api/api-router');
const usersRouter = require('./users/users-router');

const configureMiddleware = require('./api/configMiddle');
// const sessionConfig = {
//     name: "Not Your Business", //secret name. Don't want it to default
//     secret: "Mum's the Word", //sets cookie
//     cookie: {
//         maxAge: 1000 * 30, //session(cookie)only valid for 30 seconds
//         secure: false, //need to be true in production
//         httpOnly: true, //only client has access to the cookie
//     },
//     resave: false, //do we want to recreate a session even if it hasn't changed? 
//     saveUninitialized: false, //we need to dynamically change. CDPR laws against setting cookies automatically
    
//     store: new knexSessionStore({
//         knex: require('./database/dbConfig'),
//         tablename: 'sessions',
//         sidfieldname: 'sid',
//         createtable: true,
//         clearInterval: 1000 * 60 * 60
//       })
// };

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
// server.use(session(sessionConfig))


configureMiddleware(server);

server.use('/api', apiRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.json({api: 'up'});
});

module.exports = server;
