const jwt = require("jsonwebtoken");
const Session  = require("../models/Session");

const authMiddleware = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token, authorization denied"
    });
  }
                                            
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const sessionData = await Session.findOne( { token }); //it searches the tokn in the session collection
    if (!sessionData){
      return res.status(401).json({
        message:"Session expired or invalid"
      });
    }

    req.userId = decoded.id;
    next();
  }catch(error) {
    res.status(401).json({
      message:"Token is not valid"
    });
  
  }
};


module.exports = authMiddleware;