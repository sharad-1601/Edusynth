const jwt = require("jsonwebtoken");

exports.authMiddleware= async (req,res,next)=>{
  try{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(403).json({message:"Unauthenticated!"})
    const user = jwt.verify(token,process.env.SECRET_KEY)
    req.user = user
  }catch{
    res.json({message:"Server error!"})
  }
  next()
}