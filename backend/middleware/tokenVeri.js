const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header("jwt");

  if (!token) return res.status(401).send("Access Denied, No token");
  
    try {
        const verified = jwt.verify(token, "SecretPass321");
        req.user = verified; 
      } catch (err) {
        res.status(400).send("Invalid Token");
      }
    next();
}