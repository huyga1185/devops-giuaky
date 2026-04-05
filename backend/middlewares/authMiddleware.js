import * as tkRepository from '../repositories/taiKhoanRepository.js'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protectedRoute = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({message:"Access denied"});
  }

  let decodedUser;

  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.log(err);
    return res.status(401).json({message:"Access token expired or wrong"});
  }

  const user = await tkRepository.getTKById(decodedUser.tkId);

  if (!user) {
    return res.status(401).json({message:"TK not found"});
  }

  req.user = user;

  next();
};

export const checkAdmin = async (req, res, next) => {
  const user = req.user;
  
  if (!user) {
    return res.status(401).json({message:"Unauthorized"});
  }

  if (user.role != 'ADMIN') {
    return res.status(403).json({message:"Access denied"});
  }

  next();
};
