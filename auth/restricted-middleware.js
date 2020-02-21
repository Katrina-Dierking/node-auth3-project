const jwt = require ('jsonwebtoken');


module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log('failed to verify', err);
      res.status(401).json 
      ({
        success:false,
        errorMessage: 'You do not belong here'
      });
      } else {
        req.user = {department: decodedToken.department};
        next();
      }
    });
      } else {
       res.status(401).json
       ({
         success:false,
         errorMessage: 'this is not your lucky day!'
        })
      };
    };