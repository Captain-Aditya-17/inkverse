import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}