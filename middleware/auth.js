const admin = require('../config/firebase-config');
require('dotenv').config();

const authCheck = async (req,res,next) => {
  const idToken = req.header('Authorization')?.split('Bearer ')[1];

  if (!idToken) {
    // return res.status(401).json({ error: 'Unauthorized: No ID token provided' });
    next(new Error('No token added to the header'));
  }
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      // Perform additional checks or operations if needed
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error('Error verifying Email/Password ID token:', error);
      // return res.status(401).json({ error: 'Unauthorized: Invalid ID token' });
      next(new Error('Unauthorized: Invalid ID token'));
    });
};

const authAdmin = (req,res,next) => {
  if(req.user.role === "user") {
    next(new Error("Not an Admin!!"));
  }

  next();
}

module.exports = {authCheck,authAdmin};