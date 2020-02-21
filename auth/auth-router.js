const router = require('express').Router();
const bcrypt = require ('bcryptjs');

const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  let user = req.body;
  console.log('req.body')
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      // const token = generateToken(saved)
      res.status(201).json({
        user: saved,
        // token //need to manually send back token
      });
    })
    .catch (error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
      
      Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
    
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

//
function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, process.env.JWT_Secret, options);
}

module.exports = router;
