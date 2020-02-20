const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

// router.get('/', restricted, (req, res) => {
//     // const user = req.body;
//     // const hash = bcrypt.hashSync(user.password, 10);
//     // user.password = hash;

//    const { sub, department } = req.decodedToken;
//    if(department === 'staff') {
//     Users.find()
//     .then(users => {
//         res.json(users);
//     })
//     .catch(error => res.send(error));
// } else {
//     Users.findById(sub)
//     .then (user => {
//         res.json(user);
//     })
//     .catch(error => res.send(error));
// }
// });

router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(error => res.send(error));
});


// function auth (req, res, next) {
//     const {username, password} = req.headers;
//     // console.log('kd.users-router.function-auth.headers', username)
//     Users.findBy ({ username })
//         .first()
//         .then(user => {
//            if (user && bycrpt.compareSync(password, user.password)) {
//                console.log("You made it in!!")
//                next();
//            } else {
//                res.status(401).json
//                ({
//                    status: false,
//                    errorMessage: "Um, too bad so sad. You are not allowed to enter with those credentials"
//                });
//            }
//         })
//         .catch(error => {
//             res.status(500).json(error);
//         });
// }

module.exports= router; 