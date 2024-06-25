const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    
    const token=req.cookies.token;
     
    if (token==null){ 
       res.status(401).json({ msg: "No authentication token, authorization denied." });
    }
    console.log("inside try "+token)
    const verified= jwt.verify(token,"nosecretbro");
    console.log("verifying");

    if(!verified){
      res.status(401).json({ msg: "No authentication token, authorization denied." });
    }

    req.userid=verified.id
    console.log(req.userid);
    
    next();
  } catch (err) {
    console.log("outside try")
  }
};

module.exports = auth;