const router = require('express').Router();
const bcrypt = require ('bcryptjs');

const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved)
      res.status(201).json({
        user: saved,
        token //need to manually send back token
      });
    })
    .catch (error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
 
      const { username, password } = req.body;
      
      Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // req.session.user = user //saving some info about the user. Saved and send cookie
          //client holds onto cookie. Any other requests coming in are going to be saved
          //value persists
          const token = generateToken(user)
  
          res.status(200).json
          ({ 
            message: `Welcome ${user.username}!`,
            token
          });
  
        } else {
          res.status(401).json
          ({ message: 'Invalid Credentials' });
        }
    })
        .catch(error => {
          res.status(500).json(error)
        });
  });

// router.get("/protected", async (req, res, next) => {
//     try {
//         if (!req.session || !req.session.user) {
//             return res.status(403).json 
//             ({
//                 success: false, 
//                 errorMessage: "Negative Ghostrider. The pattern is full!!"
//             })
//         }
//         res.json
//         ({
//             success: true,
//             message: "Come on in!! The water's fine!"
//         })
//     } catch (error) {
//         next(error)
//     }
// });

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, process.env.JWT_Secret, options);
}

module.exports = router;
