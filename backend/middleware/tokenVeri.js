const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header("utok");

    if (!token) return res.status(401).send("Access Denied, No token");
    

    try {
       
        const verified = jwt.verify(token, "SecretPass321");
        req.user = verified; // we are setting this value
        // console.log("Request 2", req.user);
      } catch (err) {
        res.status(400).send("Invalid Token");
      }
    next();
}